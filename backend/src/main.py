from fastapi import FastAPI
from sqlmodel import SQLModel
from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv

load_dotenv()

from .database import engine
from .api import auth, tasks, chat
from . import mcp_server
from .models import chat as chat_models # Register models

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)


@asynccontextmanager
async def lifespan(app: FastAPI):
    print("Creating tables...")
    create_db_and_tables()
    
    # Connect to MCP server for the chatbot
    print("Connecting to MCP server...")
    await chat.todo_mcp_server.connect()
    
    yield
    
    # Cleanup MCP server
    print("Cleaning up MCP server...")
    await chat.todo_mcp_server.cleanup()


app = FastAPI(lifespan=lifespan)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.getenv("FRONTEND_URL")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount the MCP server as a sub-application
app.mount("/mcp", mcp_server.app)

app.include_router(auth.router)
app.include_router(tasks.router)
app.include_router(chat.router)