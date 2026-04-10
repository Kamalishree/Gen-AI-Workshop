from pydantic import BaseModel
from typing import List, Optional, Dict, Any

class UserProfileBase(BaseModel):
    name: str
    health_goals: str
    dietary_restrictions: str
    monthly_budget: float

class UserProfileCreate(UserProfileBase):
    pass

class UserProfile(UserProfileBase):
    id: int
    class Config:
        from_attributes = True

class MealPlanRequest(BaseModel):
    user_id: int
    days: int = 7
    notes: Optional[str] = None

class MealPlanResponse(BaseModel):
    id: int
    plan_name: str
    plan_data: Dict[str, Any]
    class Config:
        from_attributes = True

class ChatMessage(BaseModel):
    message: str
    user_id: int
