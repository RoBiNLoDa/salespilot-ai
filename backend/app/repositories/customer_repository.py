from sqlalchemy import select
from sqlalchemy.orm import Session
from sqlalchemy import select
from fastapi import HTTPException

from app.models.customer import Customer
from app.schemas.customer_create import CustomerCreate
from app.schemas.customer_update import CustomerUpdate
from app.exceptions.customer import CustomerNotFoundError


class CustomerRepository:

    def __init__(self, db: Session):
        self.db = db

    def get_all(self) -> list[Customer]:
        statement = select(Customer)

        return self.db.scalars(statement).all()

    def create(self, customer: CustomerCreate) -> Customer:

        db_customer = Customer(
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

    def update(self, customer_id: int, customer: CustomerUpdate) -> Customer:

        db_customer = self.db.get(Customer, customer_id)

        if db_customer is None:
            raise CustomerNotFoundError()

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

        customer = self.db.get(Customer, customer_id)

        if customer is None:
            raise CustomerNotFoundError()

        self.db.delete(customer)
        self.db.commit()
