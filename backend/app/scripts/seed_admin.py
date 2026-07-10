from sqlalchemy import select

from app.db.session import SessionLocal
from app.enums.role import Role
from app.models.user import User
from app.security.password import hash_password
from app.core.config import settings


def seed_admin():
    admin_email = settings.admin_email
    admin_password = settings.admin_password
    db = SessionLocal()

    try:
        admin = db.scalar(select(User).where(User.email == admin_email))

        if admin:
            print("Administrator already exists.")
            return

        admin = User(
            first_name="Admin",
            last_name="SalesPilot",
            email=admin_email,
            password_hash=hash_password(admin_password),
            role=Role.ADMIN,
            active=True,
        )

        db.add(admin)
        db.commit()

        print("Administrator created successfully.")

    except Exception:
        db.rollback()
        raise

    finally:
        db.close()


if __name__ == "__main__":
    seed_admin()
