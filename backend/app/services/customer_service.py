from sqlalchemy.orm import Session

from app.repositories.customer_repository import CustomerRepository


class CustomerService:

    def __init__(self, db: Session):
        self.repository = CustomerRepository(db)

    def get_all(self):
        return self.repository.get_all()
