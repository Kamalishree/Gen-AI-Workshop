from sqlalchemy import Column, Integer, String, Text, Float, JSON
from database import Base

class UserProfile(Base):
    __tablename__ = "user_profiles"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    health_goals = Column(String)  # e.g., "weight_loss, muscle_gain"
    dietary_restrictions = Column(String)  # e.g., "vegan, gluten_free"
    monthly_budget = Column(Float, default=200.0)

class MealPlan(Base):
    __tablename__ = "meal_plans"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, index=True)
    plan_name = Column(String)
    plan_data = Column(JSON)  # Store generated LangGraph structured output
