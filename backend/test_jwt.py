from app.security.jwt import create_access_token, decode_access_token

token = create_access_token(
    {
        "sub": "admin@salespilot.ai",
        "role": "ADMIN",
    }
)

print(token)

payload = decode_access_token(token)

print(payload)
