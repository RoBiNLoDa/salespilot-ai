from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.customer_model import CustomerModel


class CustomerRepository:

    def __init__(self, db: Session):
        self.db = db

    def get_all(self) -> list[CustomerModel]:
        statement = select(CustomerModel)

        return self.db.scalars(statement).all()
