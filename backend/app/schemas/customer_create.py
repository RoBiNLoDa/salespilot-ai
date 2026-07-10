from pydantic import BaseModel, EmailStr

from app.core.pydantic import camel_config


class CustomerCreate(BaseModel):

    model_config = camel_config

    first_name: str
    last_name: str
    company: str
    email: EmailStr
    phone: str
    city: str
    active: bool = True
