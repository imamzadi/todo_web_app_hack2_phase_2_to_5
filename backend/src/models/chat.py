from datetime import datetime, timezone
from typing import List, Optional
from sqlmodel import Field, Relationship, SQLModel
from .user import User

class Conversation(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="user.id")
    title: Optional[str] = Field(default="New Conversation")
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

    # Relationships
    messages: List["Message"] = Relationship(back_populates="conversation", sa_relationship_kwargs={"cascade": "all, delete-orphan"})
    user: Optional["User"] = Relationship(back_populates="conversations")

class Message(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    conversation_id: int = Field(foreign_key="conversation.id")
    role: str  # "user" or "assistant"
    content: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

    # Relationships
    conversation: Optional[Conversation] = Relationship(back_populates="messages")
