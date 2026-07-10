from fastapi import APIRouter, Depends, status, Response
from sqlalchemy.orm import Session

from app.db.dependencies import get_db
from app.models.customer import Customer
from app.services.customer_service import CustomerService
from app.models.customer_create import CustomerCreate
from app.models.customer_update import CustomerUpdate

router = APIRouter(prefix="/customers", tags=["Customers"])


@router.get("/", response_model=list[Customer])
def get_customers(db: Session = Depends(get_db)):
    service = CustomerService(db)
    return service.get_all()


@router.post("/", response_model=Customer, status_code=201)
def create_customer(customer: CustomerCreate, db: Session = Depends(get_db)):
    service = CustomerService(db)
    return service.create(customer)


@router.put("/{customer_id}", response_model=Customer)
def update_customer(
    customer_id: int,
    customer: CustomerUpdate,
    db: Session = Depends(get_db),
):
    service = CustomerService(db)

    return service.update(customer_id, customer)


@router.delete(
    "/{customer_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_customer(
    customer_id: int,
    db: Session = Depends(get_db),
):

    service = CustomerService(db)

    service.delete(customer_id)

    return Response(status_code=status.HTTP_204_NO_CONTENT)
