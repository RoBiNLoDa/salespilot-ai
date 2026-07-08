from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "SalesPilot AI API"

    api_v1_prefix: str = "/api/v1"

    frontend_origin: str = "http://localhost:4200"

    database_url: str

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")


settings = Settings()
