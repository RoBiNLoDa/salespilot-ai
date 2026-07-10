from sqlalchemy import select
from sqlalchemy.orm import Session
from sqlalchemy import select
from fastapi import HTTPException

from app.models.customer_model import CustomerModel
from app.models.customer_create import CustomerCreate
from app.models.customer_update import CustomerUpdate


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

    def update(self, customer_id: int, customer: CustomerUpdate) -> CustomerModel:

        db_customer = self.db.get(CustomerModel, customer_id)

        if db_customer is None:
            raise HTTPException(
                status_code=404,
                detail="Customer not found",
            )

        db_customer.first_name = customer.first_name
        db_customer.last_name = customer.last_name
        db_customer.company = customer.company
        db_customer.email = customer.email
        db_customer.phone = customer.phone
        db_customer.city = customer.city
        db_customer.active = customer.active

        self.db.commit()
        self.db.refresh(db_customer)

        return db_customer

    def delete(self, customer_id: int) -> None:

        customer = self.db.get(CustomerModel, customer_id)

        if customer is None:
            raise HTTPException(status_code=404, detail="Customer not found")

        self.db.delete(customer)
        self.db.commit()
