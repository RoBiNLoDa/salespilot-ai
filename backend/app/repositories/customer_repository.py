from app.models.customer import Customer


class CustomerRepository:

    def get_all(self) -> list[Customer]:
        return [
            Customer(
                id=1,
                first_name="Juan",
                last_name="Pérez",
                company="ACME",
                email="juan@acme.com",
                phone="3001234567",
                city="Bogotá",
                active=True,
            ),
            Customer(
                id=2,
                first_name="María",
                last_name="Gómez",
                company="Globant",
                email="maria@globant.com",
                phone="3009876543",
                city="Medellín",
                active=True,
            ),
        ]
