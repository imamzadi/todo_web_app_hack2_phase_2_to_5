import os
import sys
import json
from datetime import timezone, datetime
from typing import List, Optional
from dotenv import load_dotenv
from fastapi import APIRouter, Depends, HTTPException, Request
from pydantic import BaseModel
from sqlmodel import Session, select, desc
from agents import Agent, Runner
from agents.mcp import MCPServerStdio

from ..dependencies.auth import get_current_user
from ..database import get_session
from ..models.user import User
from ..models.chat import Conversation, Message
from .. import tools

load_dotenv()

router = APIRouter(
    prefix="/chat",
    tags=["chat"],
)

# Create the MCP server instance
# using sys.executable to run the mcp server module in the same environment
todo_mcp_server = MCPServerStdio(
    params={
        "command": sys.executable,
        "args": ["-u", "-m", "src.mcp_server"],
        "env": os.environ.copy(),
    },
    client_session_timeout_seconds=30,
)

my_agent = Agent(
    name="Todo Assistant",
    instructions="You are a helpful assistant that manages tasks. You can add, list, update, and delete tasks for the user. Always use the available tools.",
    mcp_servers=[todo_mcp_server],
    model="gpt-5-nano",
)

class ChatRequest(BaseModel):
    message: str
    conversation_id: Optional[int] = None
    thread_id: Optional[str] = None # Legacy/Optional

class ChatResponse(BaseModel):
    response: str
    conversation_id: int

class MessageRead(BaseModel):
    role: str
    content: str
    created_at: datetime

class ConversationRead(BaseModel):
    id: int
    title: str
    updated_at: datetime
    messages: List[MessageRead] = []


class SessionResponse(BaseModel):
    client_secret: str
    conversation_id: int


@router.post("/session", response_model=SessionResponse)
async def create_session(
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session),
):
    """
    Create a new conversation and return an ephemeral client secret for the Realtime API.
    """
    conversation = Conversation(user_id=current_user.id, title="New Chat")
    session.add(conversation)
    session.commit()
    session.refresh(conversation)

    # Placeholder: generating a random secret until OpenAI Realtime API is integrated
    import secrets
    client_secret = f"ek_test_{secrets.token_hex(32)}"

    return SessionResponse(
        client_secret=client_secret,
        conversation_id=conversation.id
    )


@router.post("/message", response_model=ChatResponse)
async def chat_message(
    request: ChatRequest,
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session),
):
    """
    Endpoint to send message to the agent and persist history.
    """
    if not os.getenv("OPENAI_API_KEY"):
         raise HTTPException(status_code=500, detail="OPENAI_API_KEY not set")
    
    # 1. Get or Create Conversation
    conversation = None
    if request.conversation_id:
        conversation = session.get(Conversation, request.conversation_id)
        if not conversation or conversation.user_id != current_user.id:
            # If not found or belongs to another user, create new (or raise error, but stricter is better)
             raise HTTPException(status_code=404, detail="Conversation not found")
    
    if not conversation:
        conversation = Conversation(
            user_id=current_user.id,
            title=request.message[:30] + "..." if len(request.message) > 30 else request.message
        )
        session.add(conversation)
        session.commit()
        session.refresh(conversation)

    # 2. Save User Message
    user_msg = Message(
        conversation_id=conversation.id,
        role="user",
        content=request.message
    )
    session.add(user_msg)
    
    # Update conversation timestamp
    conversation.updated_at = datetime.now(timezone.utc)
    session.add(conversation)
    session.commit()
    
    # 3. Prepare Agent Context
    # We can fetch previous messages to build context if the Agent SDK doesn't handle it automatically.
    # For now, we assume the agent is stateless per request or we rely on 'thread_id' if using Hosted.
    # But since we are using local Agent instance, we might need to manually pass history.
    # Start simple: pass current message. The SDK might not support history injection easily without 'handoffs' or 'threads'.
    # For a simple chatbot, we'll just send the current message.
    
    agent_instructions = f"Current User ID: {current_user.id}. You are acting on behalf of this user. Always pass user_id={current_user.id} to tools."
    
    try:
        # Clone agent 
        agent_runtime = my_agent.clone(
            instructions=my_agent.instructions + "\n" + agent_instructions
        )
        
        result = await Runner.run(
           agent_runtime,
           request.message
        )
        
        final_response = str(result.final_output)
        
        # 4. Save Assistant Message
        assistant_msg = Message(
            conversation_id=conversation.id,
            role="assistant",
            content=final_response
        )
        session.add(assistant_msg)
        session.commit()
        
        return ChatResponse(response=final_response, conversation_id=conversation.id)

    except Exception as e:
        print(f"Agent execution error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/sessions", response_model=List[ConversationRead])
async def get_sessions(
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session),
    limit: int = 10,
    offset: int = 0
):
    """
    Get all conversations for the current user.
    """
    # Fetch conversations sorted by updated_at desc
    stm = select(Conversation).where(Conversation.user_id == current_user.id).order_by(desc(Conversation.updated_at)).offset(offset).limit(limit)
    conversations = session.exec(stm).all()
    
    # For summary list, we might not want all messages, but for now let's return them or minimal.
    # The response model asks for messages. Let's return the last 2 for preview? 
    # Or just return empty messages list for the list view to save bandwidth.
    # Actually, let's keep it simple: return full objects or make a separate list model.
    # I'll populate messages.
    
    return conversations

@router.get("/session/{conversation_id}", response_model=ConversationRead)
async def get_session_detail(
    conversation_id: int,
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session),
):
    """
    Get a specific conversation with all messages.
    """
    conversation = session.get(Conversation, conversation_id)
    if not conversation or conversation.user_id != current_user.id:
        raise HTTPException(status_code=404, detail="Conversation not found")
        
    # Ensure messages are sorted (should be by id implicitly, but nice to be explicit if using created_at)
    # They are loaded via relationship which usually follows PK. 
    # If we need specific ordering we can do explicit query.
    return conversation


@router.delete("/session/{conversation_id}", status_code=204)
async def delete_session(
    conversation_id: int,
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session),
):
    """
    Delete a specific conversation.
    """
    conversation = session.get(Conversation, conversation_id)
    if not conversation or conversation.user_id != current_user.id:
        raise HTTPException(status_code=404, detail="Conversation not found")
    
    session.delete(conversation)
    session.commit()
    return None