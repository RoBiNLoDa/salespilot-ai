from typing import Annotated

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from app.db.dependencies import get_db
from app.repositories.user_repository import UserRepository
from app.security.jwt import decode_access_token
from app.exceptions.auth import InvalidTokenError
from app.models.user import User

oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/api/v1/auth/token",
)

TokenDep = Annotated[str, Depends(oauth2_scheme)]
DB = Annotated[Session, Depends(get_db)]


def get_current_user(
    token: TokenDep,
    db: DB,
) -> User:

    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid authentication credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    repository = UserRepository(db)

    try:
        payload = decode_access_token(token)
    except InvalidTokenError:
        raise credentials_exception

    email = payload.get("sub")

    if email is None:
        raise credentials_exception

    user = repository.get_by_email(email)

    if user is None:
        raise credentials_exception

    if not user.active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="User is inactive",
        )

    return user


CurrentUser = Annotated[User, Depends(get_current_user)]
