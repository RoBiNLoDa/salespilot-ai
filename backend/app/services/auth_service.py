from sqlalchemy.orm import Session

from app.repositories.user_repository import UserRepository
from app.security.password import hash_password, verify_password
from app.security.jwt import create_access_token, decode_access_token
from app.schemas.login_response import LoginResponse
from app.schemas.login_request import LoginRequest
from app.exceptions.auth import InactiveUserError, InvalidCredentialsError


class AuthService:

    def __init__(self, db: Session):
        self.user_repository = UserRepository(db)

    def login(self, request: LoginRequest) -> LoginResponse:
        user = self.user_repository.get_by_email(request.email)

        if user is None:
            raise InvalidCredentialsError()

        if not verify_password(request.password, user.password_hash):
            raise InvalidCredentialsError()

        if not user.active:
            raise InactiveUserError()

        token = create_access_token(
            {
                "sub": user.email,
                "role": user.role.value,
            }
        )

        return LoginResponse(access_token=token)
