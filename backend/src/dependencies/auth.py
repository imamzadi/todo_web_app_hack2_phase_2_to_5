from datetime import datetime, timedelta
from typing import Optional

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from pydantic import BaseModel
from sqlmodel import Session

from ..database import get_session
from ..models.user import User

import os

# Configuration
SECRET_KEY = os.environ.get("SECRET_KEY", "your-secret-key")  # TODO: Change this to a strong secret key from environment variable
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/token")


class TokenData(BaseModel):
    id: Optional[int] = None # Added id
    username: Optional[str] = None
    email: Optional[str] = None # Added email


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    from datetime import timezone
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def verify_token(token: str, credentials_exception) -> TokenData: # Changed return type
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: Optional[int] = payload.get("id") # Get id
        username: Optional[str] = payload.get("sub")
        user_email: Optional[str] = payload.get("email") # Get email

        if user_id is None and username is None: # Changed condition
            raise credentials_exception
        token_data = TokenData(id=user_id, username=username, email=user_email) # Pass all data
        return token_data
    except JWTError:
        raise credentials_exception


def get_current_user(
    session: Session = Depends(get_session), token: str = Depends(oauth2_scheme)
) -> User:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    token_data = verify_token(token, credentials_exception) # Get TokenData

    user = None
    from sqlmodel import select
    if token_data.id: # Prioritize fetching by id
        user = session.exec(select(User).where(User.id == token_data.id)).first()
    elif token_data.username:
        user = session.exec(select(User).where(User.username == token_data.username)).first()

    if user is None:
        raise credentials_exception
    return user


def get_current_user_from_token(token: str, session: Session) -> User:
    """
    Decodes a JWT token and retrieves the user from the database.
    
    This function is similar to `get_current_user` but does not use
    FastAPI's dependency injection, making it suitable for use in
    other contexts like the FastMCP server.
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    token_data = verify_token(token, credentials_exception)

    user = None
    if token_data.id:
        from sqlmodel import select
        user = session.exec(select(User).where(User.id == token_data.id)).first()
    
    if user is None:
        raise credentials_exception
    return user
