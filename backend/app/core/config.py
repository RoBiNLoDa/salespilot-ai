from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "SalesPilot AI API"

    api_v1_prefix: str = "/api/v1"

    frontend_origin: str = "http://localhost:4200"

    database_url: str

    admin_email: str
    admin_password: str

    secret_key: str
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 60

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")


settings = Settings()
