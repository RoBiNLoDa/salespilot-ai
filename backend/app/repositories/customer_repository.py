from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.customer_model import CustomerModel
from app.models.customer_create import CustomerCreate


class CustomerRepository:

    def __init__(self, db: Session):
        self.db = db

    def get_all(self) -> list[CustomerModel]:
        statement = select(CustomerModel)

        return self.db.scalars(statement).all()

    def create(self, customer: CustomerCreate) -> CustomerModel:

        db_customer = CustomerModel(
            first_name=customer.first_name,
            last_name=customer.last_name,
            company=customer.last_name,
            email=customer.email,
            phone=customer.phone,
            city=customer.city,
            active=customer.active,
        )

        self.db.add(db_customer)
        self.db.commit()
        self.db.refresh(db_customer)

        return db_customer
