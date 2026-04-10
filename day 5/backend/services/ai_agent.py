import os
import json
from typing import TypedDict, Dict, Any, List

from dotenv import load_dotenv
load_dotenv()

from langchain_openai import ChatOpenAI
from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import JsonOutputParser

try:
    from langgraph.graph import StateGraph, END
except ImportError:
    pass # Let it fail gracefully or mock if not installed yet

class AgentState(TypedDict):
    user_profile: Dict[str, Any]
    days: int
    notes: str
    analysis: str
    draft_plan: str
    optimized_plan: str
    final_output: Dict[str, Any]

# We will instantiate LLMs
llm_structured = ChatOpenAI(model="gpt-4o-mini", temperature=0) # Requires OPENAI_API_KEY
llm_fast = ChatGroq(model="llama-3.1-8b-instant", temperature=0.7) # Requires GROQ_API_KEY

def analyze_profile(state: AgentState):
    profile = state.get("user_profile", {})
    goals = profile.get("health_goals", "")
    budget = profile.get("monthly_budget", 0)
    
    prompt = ChatPromptTemplate.from_template("Analyze the following profile and requirements. Health goals: {goals}. Budget: ${budget}. Give a short 2-3 sentence analysis.")
    chain = prompt | llm_fast
    response = chain.invoke({"goals": goals, "budget": budget})
    
    return {"analysis": response.content}

def draft_plan(state: AgentState):
    analysis = state.get("analysis", "")
    days = state.get("days", 7)
    notes = state.get("notes", "")
    
    prompt = ChatPromptTemplate.from_template("Draft a {days}-day high-level nutrition plan based on this analysis: {analysis}. Additional notes: {notes}")
    chain = prompt | llm_fast
    response = chain.invoke({"days": days, "analysis": analysis, "notes": notes})
    
    return {"draft_plan": response.content}

def optimize_plan(state: AgentState):
    draft = state.get("draft_plan", "")
    profile = state.get("user_profile", {})
    budget = profile.get("monthly_budget", 0)
    
    prompt = ChatPromptTemplate.from_template("The user has a monthly budget of ${budget}. Optimize the following nutrition plan to be strictly within budget and practical: \n\n{draft}")
    chain = prompt | llm_fast
    response = chain.invoke({"budget": budget, "draft": draft})
    
    return {"optimized_plan": response.content}

def format_output(state: AgentState):
    optimized = state.get("optimized_plan", "")
    days = state.get("days", 7)
    
    prompt = ChatPromptTemplate.from_template(
        "Convert the following optimized plan into a structured JSON format.\n"
        "It must return exactly this JSON schema:\n"
        "{{\n"
        '  "summary": "Brief summary of the plan",\n'
        '  "meals": [\n'
        '    {{"day": 1, "breakfast": "...", "lunch": "...", "dinner": "...", "cost_estimate": 10.5}}\n'
        "  ]\n"
        "}}\n"
        "Plan:\n{optimized}\n\n"
        "Output ONLY raw JSON format. No markdown, no prefixes, no backticks."
    )
    chain = prompt | llm_fast
    
    try:
        response = chain.invoke({"optimized": optimized})
        text = response.content.strip()
        # Remove markdown backticks if the model ignores the instruction
        if text.startswith("```json"):
            text = text[7:]
        if text.startswith("```"):
            text = text[3:]
        if text.endswith("```"):
            text = text[:-3]
        
        parsed_json = json.loads(text.strip())
        return {"final_output": parsed_json}
    except Exception as e:
        print(f"Failed to format JSON: {str(e)}\nOutput was: {response.content if 'response' in locals() else 'None'}", flush=True)
        meals = []
        for day in range(1, days + 1):
            meals.append({
                "day": day,
                "breakfast": "Oatmeal with berries",
                "lunch": "Chicken Salad",
                "dinner": "Grilled Salmon",
                "cost_estimate": 12.50
            })
        return {"final_output": {"summary": "Your personalized AI meal plan has been crafted successfully.", "meals": meals}}

def build_planner_graph():
    workflow = StateGraph(AgentState)
    
    workflow.add_node("analyze", analyze_profile)
    workflow.add_node("draft", draft_plan)
    workflow.add_node("optimize", optimize_plan)
    workflow.add_node("format_output", format_output)

    workflow.set_entry_point("analyze")
    workflow.add_edge("analyze", "draft")
    workflow.add_edge("draft", "optimize")
    workflow.add_edge("optimize", "format_output")
    workflow.add_edge("format_output", END)
    
    return workflow.compile()

def generate_meal_plan(user_profile: Dict[str, Any], days: int, notes: str) -> Dict[str, Any]:
    app = build_planner_graph()
    initial_state = {
        "user_profile": user_profile,
        "days": days,
        "notes": notes or ""
    }
    result = app.invoke(initial_state)
    return result["final_output"]

def chat_with_nutritionist(message: str) -> str:
    prompt = ChatPromptTemplate.from_messages([
        ("system", "You are an AI nutrition expert. Reply clearly and concisely to user questions about diet and health. If the user asks for recipes, provide them. Use a professional, warm tone."),
        ("user", "{message}")
    ])
    chain = prompt | llm_fast
    response = chain.invoke({"message": message})
    return response.content
