from typing import Optional, TYPE_CHECKING
from datetime import datetime

from sqlmodel import Field, SQLModel, Relationship

if TYPE_CHECKING:
    from .user import User


class Task(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str
    description: Optional[str] = None
    status: str = Field(default="pending")  # e.g., "pending", "completed"
    create_date: datetime = Field(default_factory=datetime.utcnow, nullable=False)
    update_date: datetime = Field(default_factory=datetime.utcnow, nullable=False)

    owner_id: Optional[int] = Field(default=None, foreign_key="user.id")
    owner: Optional["User"] = Relationship(back_populates="tasks")


class TaskCreate(SQLModel):
    title: str
    description: Optional[str] = None


class TaskUpdate(SQLModel):
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = None


class TaskPublic(SQLModel):
    id: int
    title: str
    description: Optional[str] = None
    status: str
    owner_id: int
    create_date: datetime
    update_date: datetime
