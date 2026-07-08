from sqlalchemy.orm import Session

from app.repositories.customer_repository import CustomerRepository
from app.models.customer_create import CustomerCreate


class CustomerService:

    def __init__(self, db: Session):
        self.repository = CustomerRepository(db)

    def get_all(self):
        return self.repository.get_all()

    def create(self, customer: CustomerCreate):
        return self.repository.create(customer)
