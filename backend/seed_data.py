"""
Seed script to populate the database with sample data
"""
from app.config.database import SessionLocal
from app.models.user import User, UserRole
from app.models.destination import Destination
from app.models.recommendation import Recommendation, RecommendationCategory
from app.services.auth import get_password_hash

def seed_database():
    db = SessionLocal()

    try:
        # Create admin user
        admin = User(
            email="admin@crewlayover.com",
            hashed_password=get_password_hash("admin123"),
            full_name="Admin User",
            role=UserRole.ADMIN,
            is_verified=True,
            is_active=True
        )
        db.add(admin)

        # Create sample crew user
        crew = User(
            email="crew@example.com",
            hashed_password=get_password_hash("crew123"),
            full_name="Sample Crew",
            airline="Emirates",
            role=UserRole.CREW,
            is_verified=True,
            is_active=True
        )
        db.add(crew)

        # Create sample destinations
        tokyo = Destination(
            name="Tokyo",
            country="Japan",
            region="Asia",
            latitude=35.6762,
            longitude=139.6503,
            description="A vibrant city blending ultra-modern with traditional",
            highlights_24h=["Senso-ji Temple", "Shibuya Crossing", "Tokyo Skytree"],
            highlights_48h=["Senso-ji Temple", "Shibuya Crossing", "Tokyo Skytree", "Meiji Shrine", "Tsukiji Market"],
            near_airport_hotels=["Hotel Gracery Shinjuku", "Narita View Hotel"],
            safety_tips=["Very safe city", "Keep noise down on trains", "Carry cash - not all places accept cards"],
            transport_info={
                "metro": "Excellent subway system, buy a Suica/Pasmo card",
                "airport_transfer": "Narita Express to city center (~60 mins)",
                "taxi": "Available but expensive"
            },
            emergency_contacts={
                "police": "110",
                "ambulance": "119",
                "embassy_us": "+81-3-3224-5000"
            },
            timezone="Asia/Tokyo",
            cover_image_url="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf"
        )
        db.add(tokyo)
        db.flush()

        dubai = Destination(
            name="Dubai",
            country="UAE",
            region="Middle East",
            latitude=25.2048,
            longitude=55.2708,
            description="A luxurious desert city with world-class shopping and dining",
            highlights_24h=["Burj Khalifa", "Dubai Mall", "Dubai Marina"],
            highlights_48h=["Burj Khalifa", "Dubai Mall", "Dubai Marina", "Gold Souk", "Jumeirah Beach"],
            near_airport_hotels=["Dubai International Hotel", "Millennium Airport Hotel"],
            safety_tips=["Very safe", "Dress modestly in public areas", "No public displays of affection"],
            transport_info={
                "metro": "Modern metro system, cheap and efficient",
                "taxi": "Abundant and affordable",
                "uber": "Available"
            },
            emergency_contacts={
                "police": "999",
                "ambulance": "998"
            },
            timezone="Asia/Dubai",
            cover_image_url="https://images.unsplash.com/photo-1512453979798-5ea266f8880c"
        )
        db.add(dubai)
        db.flush()

        # Create sample recommendations for Tokyo
        senso_ji = Recommendation(
            destination_id=tokyo.id,
            category=RecommendationCategory.ACTIVITY,
            title="Senso-ji Temple",
            description="Tokyo's oldest temple with beautiful architecture and bustling market street",
            opening_hours={"everyday": {"open": "06:00", "close": "17:00"}},
            best_time_for_crew="Early morning (6-8am) to avoid crowds",
            duration_minutes=90,
            peak_times=["10:00-16:00"],
            price_range="Free",
            entrance_fee=0,
            reservation_required="No",
            address="2-3-1 Asakusa, Taito City, Tokyo",
            latitude=35.7148,
            longitude=139.7967,
            directions_from_airport_hotel="Take Ginza Line to Asakusa Station (5 min walk)",
            travel_time_minutes=30,
            transport_options=["Metro - Ginza Line", "Taxi"],
            nearby_food_options="Nakamise Shopping Street has many food stalls",
            safety_notes="Very safe area, watch belongings in crowded market",
            tags=["cultural", "free", "photo-worthy", "morning-friendly"],
            upvotes=45,
            downvotes=2
        )
        db.add(senso_ji)

        shibuya = Recommendation(
            destination_id=tokyo.id,
            category=RecommendationCategory.ACTIVITY,
            title="Shibuya Crossing",
            description="The world's busiest pedestrian crossing - iconic Tokyo experience",
            opening_hours={"everyday": {"open": "00:00", "close": "23:59"}},
            best_time_for_crew="Evening (18:00-20:00) for best atmosphere and lights",
            duration_minutes=30,
            peak_times=["17:00-20:00"],
            price_range="Free",
            entrance_fee=0,
            reservation_required="No",
            address="Shibuya Crossing, Shibuya City, Tokyo",
            latitude=35.6595,
            longitude=139.7004,
            directions_from_airport_hotel="JR Yamanote Line to Shibuya Station",
            travel_time_minutes=25,
            transport_options=["JR Train", "Metro", "Taxi"],
            nearby_food_options="Countless restaurants and cafes in Shibuya area",
            safety_notes="Very safe, watch for pickpockets in crowds",
            tags=["iconic", "free", "24h", "photo-worthy"],
            upvotes=67,
            downvotes=3
        )
        db.add(shibuya)

        # Create sample recommendations for Dubai
        burj_khalifa = Recommendation(
            destination_id=dubai.id,
            category=RecommendationCategory.ACTIVITY,
            title="Burj Khalifa",
            description="World's tallest building with stunning observation decks",
            opening_hours={"everyday": {"open": "08:30", "close": "23:00"}},
            best_time_for_crew="Sunset (around 18:00) for best views",
            duration_minutes=120,
            peak_times=["17:00-21:00"],
            price_range="$$$",
            entrance_fee=40.0,
            reservation_required="Recommended",
            address="1 Sheikh Mohammed bin Rashid Blvd, Dubai",
            latitude=25.1972,
            longitude=55.2744,
            directions_from_airport_hotel="Metro to Burj Khalifa/Dubai Mall station",
            travel_time_minutes=20,
            transport_options=["Metro - Red Line", "Taxi"],
            nearby_food_options="Dubai Mall has hundreds of restaurants",
            safety_notes="Very safe, book tickets online in advance",
            tags=["iconic", "photo-worthy", "must-see"],
            upvotes=89,
            downvotes=5
        )
        db.add(burj_khalifa)

        db.commit()
        print("✅ Database seeded successfully!")
        print("\n👤 Admin user: admin@crewlayover.com / admin123")
        print("👤 Crew user: crew@example.com / crew123")

    except Exception as e:
        print(f"❌ Error seeding database: {e}")
        db.rollback()
    finally:
        db.close()


if __name__ == "__main__":
    seed_database()
