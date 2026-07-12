from pydantic import BaseModel

from app.enums.role import Role

from app.core.pydantic import camel_config


class UserResponse(BaseModel):

    model_config = camel_config

    id: int
    first_name: str
    last_name: str
    email: str
    role: Role
    active: bool
