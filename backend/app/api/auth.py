from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.dependencies import get_db
from app.exceptions.auth import (
    InactiveUserError,
    InvalidCredentialsError,
)
from app.schemas.login_request import LoginRequest
from app.schemas.login_response import LoginResponse
from app.services.auth_service import AuthService

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"],
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
