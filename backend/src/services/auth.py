from typing import Optional
from sqlmodel import Session

from ..models.user import User, UserCreate

import bcrypt


def get_password_hash(password: str) -> str:
    """
    Hashes a password using bcrypt.
    """
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Verifies a password using bcrypt.
    """
    return bcrypt.checkpw(plain_password.encode("utf-8"), hashed_password.encode("utf-8"))


def create_user(user_create: UserCreate, session: Session) -> User:
    hashed_password = get_password_hash(user_create.password)
    user = User(
        username=user_create.username,
        email=user_create.email,
        hashed_password=hashed_password
    )
    session.add(user)
    session.commit()
    session.refresh(user)
    return user


def authenticate_user(username: str, password: str, session: Session) -> Optional[User]:
    from sqlmodel import select
    user = session.exec(select(User).where(User.username == username)).first()
    if not user:
        return None
    if not verify_password(password, user.hashed_password):
        return None
    return user