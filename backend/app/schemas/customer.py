from pydantic import BaseModel
from app.core.pydantic import camel_config


class Customer(BaseModel):

    model_config = camel_config

    id: int
    first_name: str
    last_name: str
    company: str
    email: str
    phone: str
    city: str
    active: bool
