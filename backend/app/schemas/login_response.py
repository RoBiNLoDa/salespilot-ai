from pydantic import BaseModel


class LoginResponse(BaseModel):
    accessToken: str
    tokenType: str = "Bearer"
