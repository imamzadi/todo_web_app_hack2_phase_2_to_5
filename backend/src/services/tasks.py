from typing import List, Optional

from sqlmodel import Session, select

from ..models.task import Task, TaskCreate, TaskUpdate
from ..models.user import User


def create_task(task_create: TaskCreate, owner: User, session: Session) -> Task:
    task = Task(**task_create.dict(), owner_id=owner.id)
    session.add(task)
    session.commit()
    session.refresh(task)
    return task


def get_tasks(
    session: Session,
    owner: User,
    offset: int = 0,
    limit: int = 100,
    status: Optional[str] = None,
) -> List[Task]:
    query = select(Task).where(Task.owner_id == owner.id)
    if status:
        query = query.where(Task.status == status)
    return session.exec(query.offset(offset).limit(limit)).all()


def get_task(session: Session, task_id: int, owner: User) -> Optional[Task]:
    return session.exec(
        select(Task).where(Task.id == task_id, Task.owner_id == owner.id)
    ).first()


def update_task(
    session: Session, task_id: int, task_update: TaskUpdate, owner: User
) -> Optional[Task]:
    task = get_task(session, task_id, owner)
    if not task:
        return None
    
    # Update only the fields that are provided in the task_update
    task_data = task_update.dict(exclude_unset=True)
    for key, value in task_data.items():
        setattr(task, key, value)

    session.add(task)
    session.commit()
    session.refresh(task)
    return task


def delete_task(session: Session, task_id: int, owner: User) -> bool:
    task = get_task(session, task_id, owner)
    if not task:
        return False
    session.delete(task)
    session.commit()
    return True
