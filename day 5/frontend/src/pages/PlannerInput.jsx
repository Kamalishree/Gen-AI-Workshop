import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Loader2, Utensils, Target, DollarSign, CalendarDays, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function PlannerInput() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "John Doe",
    health_goals: "Weight Loss",
    dietary_restrictions: "None",
    monthly_budget: 300,
    days: 7,
  });

  const goals = ["Weight Loss", "Muscle Gain", "Maintenance", "More Energy"];
  const diets = ["None", "Vegan", "Vegetarian", "Keto", "Gluten-Free"];

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const profileRes = await axios.post("http://localhost:8000/api/users/profile", {
        name: formData.name,
        health_goals: formData.health_goals,
        dietary_restrictions: formData.dietary_restrictions,
        monthly_budget: Number(formData.monthly_budget),
      });
      const userId = profileRes.data.id;

      await axios.post("http://localhost:8000/api/planner/generate-meal-plan", {
        user_id: userId,
        days: Number(formData.days),
      });

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Error generating plan. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass p-10 rounded-[2rem] shadow-xl relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 to-blue-500" />
        
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-3">Design Your Diet</h2>
          <p className="text-gray-500">Tell us what you need, and our AI will work its magic.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
          
          {/* Name */}
          <div className="space-y-3">
            <label className="flex items-center text-sm font-bold text-gray-700 uppercase tracking-wider">
               What should we call you?
            </label>
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              className="w-full px-5 py-4 bg-gray-50/50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 outline-none transition-all text-lg font-medium text-gray-800" 
              required 
            />
          </div>

          {/* Goals (Cards) */}
          <div className="space-y-3">
            <label className="flex items-center text-sm font-bold text-gray-700 uppercase tracking-wider gap-2">
               <Target className="w-5 h-5 text-blue-500" /> Primary Goal
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {goals.map(goal => (
                <div 
                  key={goal}
                  onClick={() => setFormData({...formData, health_goals: goal})}
                  className={`cursor-pointer border-2 rounded-2xl p-4 text-center transition-all ${formData.health_goals === goal ? 'border-blue-500 bg-blue-50 shadow-md shadow-blue-500/10' : 'border-gray-100 bg-white hover:border-gray-200 hover:bg-gray-50'}`}
                >
                  <div className={`font-semibold ${formData.health_goals === goal ? 'text-blue-700' : 'text-gray-600'}`}>{goal}</div>
                  {formData.health_goals === goal && <CheckCircle2 className="w-5 h-5 text-blue-500 mx-auto mt-2" />}
                </div>
              ))}
            </div>
          </div>

          {/* Diets (Cards) */}
          <div className="space-y-3">
            <label className="flex items-center text-sm font-bold text-gray-700 uppercase tracking-wider gap-2">
               <Utensils className="w-5 h-5 text-green-500" /> Dietary Preferences
            </label>
            <div className="flex flex-wrap gap-3">
              {diets.map(diet => (
                <div 
                  key={diet}
                  onClick={() => setFormData({...formData, dietary_restrictions: diet})}
                  className={`cursor-pointer px-6 py-3 rounded-full border-2 transition-all font-semibold ${formData.dietary_restrictions === diet ? 'border-green-500 bg-green-50 text-green-700 shadow-md shadow-green-500/10' : 'border-gray-100 bg-white text-gray-600 hover:border-gray-200 hover:bg-gray-50'}`}
                >
                  {diet}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            {/* Slider Budget */}
            <div className="space-y-4">
              <label className="flex items-center justify-between text-sm font-bold text-gray-700 uppercase tracking-wider">
                <span className="flex items-center gap-2"><DollarSign className="w-5 h-5 text-orange-500" /> Monthly Budget</span>
                <span className="text-orange-600 text-xl">${formData.monthly_budget}</span>
              </label>
              <input 
                type="range" 
                name="monthly_budget" 
                min="100" max="1500" step="50"
                value={formData.monthly_budget} 
                onChange={handleChange} 
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500" 
              />
            </div>
            
            {/* Slider Days */}
            <div className="space-y-4">
              <label className="flex items-center justify-between text-sm font-bold text-gray-700 uppercase tracking-wider">
                <span className="flex items-center gap-2"><CalendarDays className="w-5 h-5 text-indigo-500" /> Plan Duration</span>
                <span className="text-indigo-600 text-xl">{formData.days} Days</span>
              </label>
              <input 
                type="range" 
                name="days" 
                min="1" max="14" step="1"
                value={formData.days} 
                onChange={handleChange} 
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-500" 
              />
            </div>
          </div>

          <div className="pt-8">
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit" 
              disabled={loading} 
              className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white font-bold py-5 rounded-2xl shadow-xl hover:shadow-2xl transition flex items-center justify-center disabled:opacity-70 text-lg relative overflow-hidden group"
            >
              {loading ? (
                 <><Loader2 className="animate-spin mr-3 w-6 h-6" /> Analyzing Your Profile & Crafting Plan...</>
              ) : (
                 <>Generate My Perfect Plan <Target className="ml-2 w-6 h-6" /></>
              )}
              {!loading && <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
