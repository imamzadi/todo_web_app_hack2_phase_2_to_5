---
id: 013
title: Fix Tool Decorator Application in MCP Server
stage: green
date: 2026-01-15
surface: agent
model: gemini-1.5-pro
feature: ai-chatbot-agent
branch: main
user: user
command: File "F:\ai_dd\hackathon2\todo_webapp\backend\src\main.py", line 12, in <module> ...
labels: [ "bugfix", "fastmcp", "backend" ]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
- backend/src/mcp_server.py
tests:
- (none)
---

## Prompt

I have resolve some iport error my self now resolve this issue `   from . import mcp_server
  File "F:\ai_dd\hackathon2\todo_webapp\backend\src\mcp_server.py", line 24, in <module>
    setup_tools(app)
    ~~~~~~~~~~~^^^^^
  File "F:\ai_dd\hackathon2\todo_webapp\backend\src\mcp_server.py", line 21, in setup_tools
    mcp_app.tool(func)
    ~~~~~~~~~~~~^^^^^^
  File "F:\ai_dd\hackathon2\todo_webapp\backend\.venv\Lib\site-packages\mcp\server\fastmcp\server.py", line 487, in tool
    raise TypeError(
        "The @backend\src\tools.py decorator was used incorrectly. Did you forget to call it? Use @backend\src\tools.py() instead of @tool"
    )
TypeError: The @backend\src\tools.py decorator was used incorrectly. Did you forget to call it? Use @backend\src\tools.py() instead of @tool`
---
Content from referenced files ---
Content from @backend\src\tools.py:
from sqlmodel import Session
from fastapi import Depends
from .models.task import TaskCreate, TaskUpdate
from .models.user import User
from .services import tasks as task_service
from .dependencies.mcp import get_db_session, get_current_mcp_user

# Note: The functions defined here are wrappers around the core services.
# They are designed to be registered with the MCP server and called by the AI agent.
# The `db` and `owner` parameters will be injected by the FastMCP server.

def add_task(title: str, description: str = None, db: Session = Depends(get_db_session), owner: User = Depends(get_current_mcp_user)) -> str:
    """
    Adds a new task for the authenticated user.
    """
    task_in = TaskCreate(title=title, description=description)
    try:
        task = task_service.create_task(task_create=task_in, owner=owner, session=db)
        return f"Task '{task.title}' created successfully with ID {task.id}."
    except Exception as e:
        return f"Error creating task: {e}"

def list_tasks(status: str = None, db: Session = Depends(get_db_session), owner: User = Depends(get_current_mcp_user)) -> str:
    """
    Lists all tasks for the current user, optionally filtering by status (e.g., 'pending', 'completed').
    """
    try:
        tasks = task_service.get_tasks(session=db, owner=owner, status=status)
        if not tasks:
            return "No tasks found."
        task_list = "\n".join(
            [f"- ID: {t.id}, Title: '{t.title}', Status: {t.status}" for t in tasks]
        )
        return f"Here are your tasks:\n{task_list}"
    except Exception as e:
        return f"Error listing tasks: {e}"

def update_task_status(
    task_id: int, status: str, db: Session = Depends(get_db_session), owner: User = Depends(get_current_mcp_user)
) -> str:
    """
    Updates the status of an existing task (e.g., to 'pending' or 'completed').
    """
    task_update = TaskUpdate(status=status)
    try:
        updated_task = task_service.update_task(
            session=db, task_id=task_id, task_update=task_update, owner=owner
        )
        if not updated_task:
            return (
                f"Error: Task with ID {task_id} not found or you don't have permission."
            )
        return f"Task '{updated_task.title}' (ID: {updated_task.id}) has been updated to '{updated_task.status}'."
    except Exception as e:
        return f"Error updating task: {e}"

def delete_task(task_id: int, db: Session = Depends(get_db_session), owner: User = Depends(get_current_mcp_user)) -> str:
    """
    Deletes a task by its ID.
    """
    try:
        success = task_service.delete_task(session=db, task_id=task_id, owner=owner)
        if not success:
            return (
                f"Error: Task with ID {task_id} not found or you don't have permission."
            )
        return f"Task with ID {task_id} has been deleted."
    except Exception as e:
        return f"Error deleting task: {e}"

## Response snapshot

I have fixed the `TypeError` related to the incorrect usage of the `@mcp.tool` decorator in `backend/src/mcp_server.py`.

The issue was that `mcp_app.tool(func)` was called directly, but `mcp.tool` is a decorator factory and needs to be called to get the actual decorator. The fix changes the call to `mcp_app.tool()(func)`.

## Outcome

- ✅ Impact: Resolved the `TypeError` that prevented the MCP server from starting.
- 🧪 Tests: No new tests were added.
- 📁 Files: Modified `backend/src/mcp_server.py`.
- 🔁 Next prompts: User to verify the fix.
- 🧠 Reflection: The error message was very explicit and directly pointed to the solution after understanding how decorators are applied programmatically.

## Evaluation notes (flywheel)

- Failure modes observed: Incorrect programmatic application of a decorator factory.
- Graders run and results (PASS/FAIL): (none)
- Prompt variant (if applicable): (none)
- Next experiment (smallest change to try): (none)
