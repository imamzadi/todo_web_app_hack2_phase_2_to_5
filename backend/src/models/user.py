from typing import List, Optional, TYPE_CHECKING
from datetime import datetime

from sqlmodel import Field, SQLModel, Relationship

if TYPE_CHECKING:
    from .task import Task


class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    username: str = Field(index=True, unique=True)
    email: str = Field(index=True, unique=True)
    hashed_password: str
    is_active: bool = Field(default=True)
    create_date: datetime = Field(default_factory=datetime.utcnow, nullable=False)
    update_date: datetime = Field(default_factory=datetime.utcnow, nullable=False)

    tasks: List["Task"] = Relationship(back_populates="owner")
    conversations: List["Conversation"] = Relationship(back_populates="user")


class UserCreate(SQLModel):
    username: str
    email: str
    password: str


class UserPublic(SQLModel):
    id: int
    username: str
    email: str
    is_active: bool
    create_date: datetime
    update_date: datetime