from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import models, schemas, database
from services.ai_agent import generate_meal_plan

router = APIRouter()

@router.post("/generate-meal-plan", response_model=schemas.MealPlanResponse)
def create_meal_plan(request: schemas.MealPlanRequest, db: Session = Depends(database.get_db)):
    user = db.query(models.UserProfile).filter(models.UserProfile.id == request.user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    user_dict = {
        "id": user.id,
        "name": user.name,
        "health_goals": user.health_goals,
        "dietary_restrictions": user.dietary_restrictions,
        "monthly_budget": user.monthly_budget,
    }
    
    try:
        plan_data = generate_meal_plan(user_dict, request.days, request.notes)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Agent Error: {str(e)}")
        
    db_plan = models.MealPlan(
        user_id=user.id,
        plan_name=f"{request.days}-Day Plan for {user.name}",
        plan_data=plan_data
    )
    db.add(db_plan)
    db.commit()
    db.refresh(db_plan)
    
    return db_plan

@router.get("/meal-plans/{user_id}", response_model=list[schemas.MealPlanResponse])
def get_user_meal_plans(user_id: int, db: Session = Depends(database.get_db)):
    plans = db.query(models.MealPlan).filter(models.MealPlan.user_id == user_id).all()
    return plans

@router.get("/all-meal-plans", response_model=list[schemas.MealPlanResponse])
def get_all_meal_plans(db: Session = Depends(database.get_db)):
    plans = db.query(models.MealPlan).order_by(models.MealPlan.id.desc()).all()
    return plans
