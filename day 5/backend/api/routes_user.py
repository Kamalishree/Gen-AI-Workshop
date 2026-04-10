from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import models, schemas, database

router = APIRouter()

@router.post("/profile", response_model=schemas.UserProfile)
def create_profile(profile: schemas.UserProfileCreate, db: Session = Depends(database.get_db)):
    db_profile = models.UserProfile(**profile.model_dump())
    db.add(db_profile)
    db.commit()
    db.refresh(db_profile)
    return db_profile

@router.get("/profile/{user_id}", response_model=schemas.UserProfile)
def get_profile(user_id: int, db: Session = Depends(database.get_db)):
    db_profile = db.query(models.UserProfile).filter(models.UserProfile.id == user_id).first()
    if not db_profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    return db_profile
