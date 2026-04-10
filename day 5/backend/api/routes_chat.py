from fastapi import APIRouter
import schemas
from services.ai_agent import chat_with_nutritionist

router = APIRouter()

@router.post("/")
def chat(message: schemas.ChatMessage):
    # In a full app, we would load previous messages from DB using user_id
    response = chat_with_nutritionist(message.message)
    return {"reply": response}
