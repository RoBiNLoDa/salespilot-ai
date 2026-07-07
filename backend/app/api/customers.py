from fastapi import APIRouter
from app.services.customer_service import CustomerService
from app.models.customer import Customer

router = APIRouter(prefix="/customers", tags=["Customers"])

service = CustomerService()


@router.get("/", response_model=list[Customer])
def get_customers():
    return service.get_all()
