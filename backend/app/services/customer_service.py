from sqlalchemy.orm import Session

from app.repositories.customer_repository import CustomerRepository
from app.models.customer_create import CustomerCreate
from app.models.customer_update import CustomerUpdate


class CustomerService:

    def __init__(self, db: Session):
        self.repository = CustomerRepository(db)

    def get_all(self):
        return self.repository.get_all()

    def create(self, customer: CustomerCreate):
        return self.repository.create(customer)

    def update(
        self,
        customer_id: int,
        customer: CustomerUpdate,
    ):
        return self.repository.update(customer_id, customer)

    def delete(self, customer_id: int) -> None:
        self.repository.delete(customer_id)
