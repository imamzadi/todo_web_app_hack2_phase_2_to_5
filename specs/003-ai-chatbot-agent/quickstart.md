# Quickstart: AI Chatbot Agent

This document provides a quick overview of how to set up and run the AI Chatbot Agent feature.

## Backend Setup

1.  **Install Dependencies**: New Python dependencies (`openai-chatkit`, `mcp-sdk`, `openai-agents`) will be added to `pyproject.toml`. Run `uv pip install -r requirements.txt` to install them.
2.  **Environment Variables**: No new environment variables are required for this feature.
3.  **Run the MCP Server**: A new MCP server will be created. It will be run as part of the main FastAPI application.

## Frontend Setup

1.  **Install Dependencies**: The `openai-chatkit` JS SDK will be added to `package.json`. Run `npm install` to install it.
2.  **Run the Application**: Run `npm run dev` to start the Next.js development server.
3.  **Access the Chatbot**: The chatbot will be available on the dashboard page.

## Usage

1.  Navigate to the dashboard.
2.  Open the chat interface.
3.  Type a message to the chatbot, for example: "create a new task called 'My new task'".
4.  The chatbot should respond and create the new task.
