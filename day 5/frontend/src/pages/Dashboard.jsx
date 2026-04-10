import { useState, useEffect } from "react";
import axios from "axios";
import { Loader2, DollarSign, Calendar, Info, PieChart as PieChartIcon } from "lucide-react";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from "recharts";

export default function Dashboard() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/planner/all-meal-plans");
        setPlans(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
  }, []);

  const getChartData = () => {
    // Mock analytics logic just for visuals
    return [
      { name: 'Protein', value: 30, color: '#3b82f6' },
      { name: 'Carbs', value: 45, color: '#f97316' },
      { name: 'Fats', value: 25, color: '#22c55e' },
    ];
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] space-y-4">
      <Loader2 className="w-12 h-12 text-green-500 animate-spin" />
      <h3 className="text-xl font-medium text-gray-500 animate-pulse">Loading your dashboard...</h3>
    </div>
  );

  if (plans.length === 0) return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] space-y-6">
      <div className="bg-gray-100 p-8 rounded-full">
         <PieChartIcon className="w-16 h-16 text-gray-400" />
      </div>
      <h3 className="text-2xl font-bold text-gray-700">No meal plans found</h3>
      <p className="text-gray-500">Generate your first plan to start tracking!</p>
    </div>
  );

  // We will just show the latest plan for the active dashboard view 
  const currentPlan = plans[0];
  const chartData = getChartData();

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 space-y-10">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Your Dashboard</h1>
          <p className="text-gray-500 mt-2 text-lg">Latest Active Plan: <span className="font-semibold text-green-600">{currentPlan.plan_name}</span></p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Left Col - Overview & Chart */}
        <div className="lg:col-span-1 space-y-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass rounded-3xl p-8 shadow-sm border border-green-100"
          >
             <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Info className="w-5 h-5 text-blue-500" /> AI Executive Summary
             </h3>
             <p className="text-gray-700 leading-relaxed bg-white/50 p-4 rounded-xl border border-gray-100 italic">
               "{currentPlan.plan_data.summary}"
             </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="glass rounded-3xl p-8 shadow-sm"
          >
             <h3 className="text-xl font-bold text-gray-900 mb-6 font-sans">Predicted Macros Match</h3>
             <div className="h-64">
               <ResponsiveContainer width="100%" height="100%">
                 <PieChart>
                   <Pie
                     data={chartData}
                     cx="50%"
                     cy="50%"
                     innerRadius={60}
                     outerRadius={80}
                     paddingAngle={5}
                     dataKey="value"
                   >
                     {chartData.map((entry, index) => (
                       <Cell key={`cell-${index}`} fill={entry.color} />
                     ))}
                   </Pie>
                   <RechartsTooltip />
                   <Legend verticalAlign="bottom" height={36}/>
                 </PieChart>
               </ResponsiveContainer>
             </div>
          </motion.div>
        </div>

        {/* Right Col - Meal Cards */}
        <div className="lg:col-span-2">
           <motion.div variants={containerVariants} initial="hidden" animate="show" className="grid gap-6 sm:grid-cols-2">
             {currentPlan.plan_data.meals?.map((meal, idx) => (
               <motion.div 
                  variants={itemVariants}
                  key={idx} 
                  className="bg-white border text-left border-gray-100 rounded-3xl p-6 hover:shadow-xl hover:border-green-200 transition-all group overflow-hidden relative"
               >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-50 to-blue-50 rounded-full blur-3xl -z-10 group-hover:scale-150 transition-transform duration-500" />
                  
                  <div className="flex justify-between items-center mb-6">
                    <span className="bg-gradient-to-r from-green-500 to-green-600 text-white text-xs font-bold px-4 py-1.5 rounded-full flex items-center shadow-sm">
                       <Calendar className="w-3 h-3 mr-1" /> Day {meal.day}
                    </span>
                    <span className="text-orange-600 text-sm flex items-center font-bold bg-orange-50 px-3 py-1 rounded-full">
                       <DollarSign className="w-4 h-4" /> {meal.cost_estimate}
                    </span>
                  </div>

                  <div className="space-y-5">
                    <div className="group/item">
                      <div className="text-xs text-blue-500 uppercase font-extrabold tracking-wider mb-1">Breakfast</div>
                      <div className="text-gray-900 font-medium group-hover/item:text-blue-600 transition-colors">{meal.breakfast}</div>
                    </div>
                    <div className="w-full h-px bg-gray-100" />
                    <div className="group/item">
                      <div className="text-xs text-orange-500 uppercase font-extrabold tracking-wider mb-1">Lunch</div>
                      <div className="text-gray-900 font-medium group-hover/item:text-orange-600 transition-colors">{meal.lunch}</div>
                    </div>
                    <div className="w-full h-px bg-gray-100" />
                    <div className="group/item">
                      <div className="text-xs text-green-600 uppercase font-extrabold tracking-wider mb-1">Dinner</div>
                      <div className="text-gray-900 font-medium group-hover/item:text-green-700 transition-colors">{meal.dinner}</div>
                    </div>
                  </div>
               </motion.div>
             ))}
           </motion.div>
        </div>
      </div>
    </div>
  );
}
