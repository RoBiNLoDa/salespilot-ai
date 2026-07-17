from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.db.dependencies import get_db
from app.exceptions.auth import (
    InactiveUserError,
    InvalidCredentialsError,
)
from app.schemas.login_request import LoginRequest
from app.schemas.login_response import LoginResponse
from app.services.auth_service import AuthService
from app.schemas.user_response import UserResponse
from app.models.user import User
from app.security.dependencies import get_current_user

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"],
)


@router.post(
    "/token",
    response_model=LoginResponse,
)
def token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    db: Session = Depends(get_db),
):
    service = AuthService(db)

    request = LoginRequest(
        email=form_data.username,
        password=form_data.password,
    )

    try:
        return service.login(request)

    except InvalidCredentialsError:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password",
        )

    except InactiveUserError:
        raise HTTPException(
            status_code=403,
            detail="User is inactive",
        )


@router.post(
    "/login",
    response_model=LoginResponse,
)
def login(
    request: LoginRequest,
    db: Session = Depends(get_db),
):
    service = AuthService(db)

    try:
        return service.login(request)

    except InvalidCredentialsError:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password",
        )

    except InactiveUserError:
        raise HTTPException(
            status_code=403,
            detail="User is inactive",
        )


@router.get(
    "/me",
    response_model=UserResponse,
)
def me(
    current_user: User = Depends(get_current_user),
):
    return current_user
