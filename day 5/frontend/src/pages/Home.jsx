import { Link } from "react-router-dom";
import { ArrowRight, Apple, HeartPulse, Wallet, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <div className="relative min-h-[90vh] overflow-hidden pt-20 -mt-20 flex flex-col justify-center">
      {/* Background Orbs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 bg-slate-50">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-green-200/50 blur-3xl animate-gradient-x" />
        <div className="absolute top-[20%] right-[-5%] w-[30%] h-[50%] rounded-full bg-blue-200/40 blur-3xl animate-gradient-x" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-[-10%] left-[20%] w-[50%] h-[30%] rounded-full bg-orange-200/30 blur-3xl animate-gradient-x" style={{ animationDelay: '4s' }} />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center space-y-8 max-w-4xl mx-auto"
        >
          <motion.div 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium text-green-700 bg-green-50/50 shadow-sm border border-green-200"
          >
            <Sparkles className="w-4 h-4 text-green-500" />
            <span>AI-Powered Precision Nutrition</span>
          </motion.div>
          
          <h1 className="text-6xl sm:text-7xl font-extrabold text-gray-900 tracking-tight leading-tight">
            Design your diet with <br/>
            <span className="text-gradient drop-shadow-sm">Perfect Macros</span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Stop guessing your meals. Tell us your goals, budget, and cravings, and our advanced AI will craft the ultimate personalized meal plan in seconds.
          </p>
          
          <div className="flex justify-center gap-6 pt-6">
            <Link to="/plan">
              <motion.button 
                whileHover={{ scale: 1.05, boxShadow: "0px 10px 30px rgba(34, 197, 94, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-green-500/30 transition-all"
              >
                Create Your Plan <ArrowRight className="h-5 w-5" />
              </motion.button>
            </Link>
            <Link to="/chat">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 bg-white text-gray-800 px-8 py-4 rounded-xl font-bold shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                Ask Expert
              </motion.button>
            </Link>
          </div>
        </motion.section>

        <motion.section 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid md:grid-cols-3 gap-8 pt-24"
        >
          <motion.div variants={itemVariants} className="glass p-8 rounded-3xl text-center space-y-5 relative group overflow-hidden hover:border-green-300 transition-colors">
            <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="bg-gradient-to-br from-green-100 to-green-200 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto text-green-600 shadow-sm transform group-hover:-translate-y-1 transition-transform">
                <HeartPulse className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mt-6">Health Optimized</h3>
              <p className="text-gray-600 mt-3 relative z-10">Algorithms designed specifically for your macros, health goals, and unique dietary restrictions.</p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="glass p-8 rounded-3xl text-center space-y-5 relative group overflow-hidden hover:border-blue-300 transition-colors">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto text-blue-600 shadow-sm transform group-hover:-translate-y-1 transition-transform">
                <Wallet className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mt-6">Budget Aware</h3>
              <p className="text-gray-600 mt-3 relative z-10">Smart ingredient selection ensures your weekly meals stay well within your defined limits.</p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="glass p-8 rounded-3xl text-center space-y-5 relative group overflow-hidden hover:border-orange-300 transition-colors">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="bg-gradient-to-br from-orange-100 to-orange-200 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto text-orange-600 shadow-sm transform group-hover:-translate-y-1 transition-transform">
                <Apple className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mt-6">Delicious Recipes</h3>
              <p className="text-gray-600 mt-3 relative z-10">Beautiful, easy-to-follow instructions for incredibly tasty meals you'll actually look forward to.</p>
            </div>
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
}
