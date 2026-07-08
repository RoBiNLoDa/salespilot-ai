from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.dependencies import get_db
from app.models.customer import Customer
from app.services.customer_service import CustomerService
from app.models.customer_create import CustomerCreate

router = APIRouter(prefix="/customers", tags=["Customers"])


@router.get("/", response_model=list[Customer])
def get_customers(db: Session = Depends(get_db)):
    service = CustomerService(db)
    return service.get_all()


@router.post("/", response_model=Customer, status_code=201)
def create_customer(customer: CustomerCreate, db: Session = Depends(get_db)):
    service = CustomerService(db)
    return service.create(customer)
