from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import database, models
from api import routes_user, routes_planner, routes_chat

# Create database tables
models.Base.metadata.create_all(bind=database.engine)

app = FastAPI(title="AI Smart Nutrition & Meal Planner API")

# Setup CORS to allow frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(routes_user.router, prefix="/api/users", tags=["Users"])
app.include_router(routes_planner.router, prefix="/api/planner", tags=["Planner"])
app.include_router(routes_chat.router, prefix="/api/chat", tags=["Chat"])

@app.get("/")
def read_root():
    return {"message": "Welcome to AI Smart Nutrition API. Access /docs for swagger."}
