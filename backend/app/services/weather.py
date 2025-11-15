import requests
from typing import Optional
from ..config.settings import settings


class WeatherService:
    """Service for fetching weather data from OpenWeather API"""

    BASE_URL = "https://api.openweathermap.org/data/2.5"

    @staticmethod
    def get_current_weather(lat: float, lon: float) -> Optional[dict]:
        """Get current weather for a location"""
        if not settings.WEATHER_API_KEY:
            return None

        try:
            response = requests.get(
                f"{WeatherService.BASE_URL}/weather",
                params={
                    "lat": lat,
                    "lon": lon,
                    "appid": settings.WEATHER_API_KEY,
                    "units": "metric"
                },
                timeout=5
            )
            response.raise_for_status()
            return response.json()
        except Exception as e:
            print(f"Error fetching weather: {e}")
            return None

    @staticmethod
    def get_forecast(lat: float, lon: float) -> Optional[dict]:
        """Get 7-day forecast for a location"""
        if not settings.WEATHER_API_KEY:
            return None

        try:
            response = requests.get(
                f"{WeatherService.BASE_URL}/forecast",
                params={
                    "lat": lat,
                    "lon": lon,
                    "appid": settings.WEATHER_API_KEY,
                    "units": "metric",
                    "cnt": 40  # 5 days in 3-hour intervals
                },
                timeout=5
            )
            response.raise_for_status()
            return response.json()
        except Exception as e:
            print(f"Error fetching forecast: {e}")
            return None

    @staticmethod
    def get_astronomy(lat: float, lon: float) -> Optional[dict]:
        """Get sunrise/sunset times"""
        if not settings.WEATHER_API_KEY:
            return None

        try:
            response = requests.get(
                f"{WeatherService.BASE_URL}/weather",
                params={
                    "lat": lat,
                    "lon": lon,
                    "appid": settings.WEATHER_API_KEY,
                },
                timeout=5
            )
            response.raise_for_status()
            data = response.json()

            if "sys" in data:
                return {
                    "sunrise": data["sys"].get("sunrise"),
                    "sunset": data["sys"].get("sunset"),
                    "timezone": data.get("timezone")
                }
            return None
        except Exception as e:
            print(f"Error fetching astronomy data: {e}")
            return None
