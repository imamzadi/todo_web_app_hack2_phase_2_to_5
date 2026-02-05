from typing import Optional, List
from .database import get_session
from .dependencies.auth import get_current_user_from_token
from .models.task import TaskCreate, TaskUpdate, TaskPublic, Task
from .services import tasks as task_service
from fastmcp import Context
from sqlmodel import Session

def _get_user_from_ctx(ctx: Context, session: Session):
    """Helper to extract user from context."""
    # This is a placeholder. In a real agentic setup, the agent usually ensures
    # the user is authenticated, or we pass the token/user_id explicitly.
    # For now, we'll check if dependencies are injected or try to parse metadata.
    # In a FastMCP context, we might rely on the 'user_id' being passed in arguments
    # if the LLM is trusted, OR verifying a token in the context metadata.
    
    # Assuming the agent passes 'user_id' or we have a way to resolve it.
    # For this hackathon scope, we might need to rely on an explicit argument
    # provided by the Agent if Context doesn't carry auth headers easily.
    pass

def add_task(title: str, description: str = None, user_id: int = None, ctx: Context = None) -> str:
    """
    Adds a new task.
    """
    db = next(get_session())
    try:
        # Ideally, we get the user from the context/token.
        # Check if the agent passed a user_id explicitly (trusted environment)
        # OR if we can verify the token.
        owner = None

        
        # Fallback for now: require user_id to be passed by the agent who knows who it is talking to.
        # This is insecure for public apps but valid for this agent-on-behalf-of-user loop if the agent is trusted.
        if not user_id:
            return "Error: user_id is required."

        # Quick fix to get User object
        from .models.user import User
        owner = db.get(User, user_id)
        if not owner:
            return f"Error: User with ID {user_id} not found."

        task_in = TaskCreate(title=title, description=description)
        task = task_service.create_task(task_create=task_in, owner=owner, session=db)
        return f"Task '{task.title}' created successfully with ID {task.id}."
    except Exception as e:
        return f"Error creating task: {e}"
    finally:
        db.close()

def list_tasks(status: str = None, user_id: int = None, ctx: Context = None) -> str:
    """
    Lists tasks, optionally filtered by status.
    """
    if not user_id:
        return "Error: user_id is required."
    
    db = next(get_session())
    try:
        from .models.user import User
        owner = db.get(User, user_id)
        if not owner:
            return "Error: User not found."

        tasks = task_service.get_tasks(session=db, owner=owner, status=status.lower())
        if not tasks:
            return "No tasks found."
        
        return "\n".join([f"{t.id}: {t.title} [{t.status}]" for t in tasks])
    except Exception as e:
        return f"Error listing tasks: {e}"
    finally:
        db.close()

def update_task_status(task_id: int, status: str, user_id: int = None, ctx: Context = None) -> str:
    """
    Updates a task's status.
    """
    if not user_id:
        return "Error: user_id is required."

    db = next(get_session())
    try:
        from .models.user import User
        owner = db.get(User, user_id)
        
        # Service read_task checks ownership? 
        # task_service.read_task returns a task, let's check if we can update.
        task = task_service.get_task(session=db, task_id=task_id, owner=owner)
        if not task:
             return f"Task {task_id} not found or access denied."
        
        task_update = TaskUpdate(status=status)
        updated_task = task_service.update_task(session=db, task_id=task_id, task_update=task_update, owner=owner)
        return f"Task {task_id} status updated to {updated_task.status}."
    except Exception as e:
        return f"Error updating task: {e}"
    finally:
        db.close()

def delete_task(task_id: int, user_id: int = None, ctx: Context = None) -> str:
    """
    Deletes a task.
    """
    if not user_id:
        return "Error: user_id is required."

    db = next(get_session())
    try:
        from .models.user import User
        owner = db.get(User, user_id)
        
        task = task_service.get_task(session=db, task_id=task_id, owner=owner)
        if not task:
            return f"Task {task_id} not found or access denied."

        success = task_service.delete_task(session=db, task_id=task_id, owner=owner)
        if not success:
             return f"Task {task_id} not found or could not be deleted."
        return f"Task {task_id} deleted."
    except Exception as e:
        return f"Error deleting task: {e}"
    finally:
        db.close()