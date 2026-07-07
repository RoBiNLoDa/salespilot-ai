from pydantic import BaseModel


class Customer(BaseModel):
    id: int
    first_name: str
    last_name: str
    company: str
    email: str
    phone: str
    city: str
    active: bool
