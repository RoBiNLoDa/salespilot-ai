from app.security.password import hash_password, verify_password

password = "Admin123"

hashed = hash_password(password)

print(hashed)

print(verify_password("Admin123", hashed))

print(verify_password("Incorrecta", hashed))
