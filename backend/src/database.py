from sqlmodel import create_engine, Session
import os
import dotenv

dotenv.load_dotenv()

DATABASE_URL = os.environ.get("DATABASE_URL")

engine = create_engine(DATABASE_URL, echo=os.environ.get("SQL_ECHO", "False").lower() == "true", pool_recycle=1800)


def get_session():
    with Session(engine) as session:
        yield session