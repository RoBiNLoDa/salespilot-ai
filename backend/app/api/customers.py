from fastapi import APIRouter
from app.services.customer_service import CustomerService

router = APIRouter(prefix="/customers", tags=["Customers"])

service = CustomerService()


@router.get("/")
def get_customers():
    return service.get_all()
