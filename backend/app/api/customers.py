from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.dependencies import get_db
from app.models.customer import Customer
from app.services.customer_service import CustomerService

router = APIRouter(prefix="/customers", tags=["Customers"])


@router.get("/", response_model=list[Customer])
def get_customers(db: Session = Depends(get_db)):
    service = CustomerService(db)
    return service.get_all()
