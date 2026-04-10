import { Link, useLocation } from "react-router-dom";
import { Leaf, User, LayoutDashboard, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

export default function Navbar() {
  const location = useLocation();

  const links = [
    { name: "Home", path: "/", icon: Leaf },
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Create Plan", path: "/plan", icon: User },
    { name: "Chat Expert", path: "/chat", icon: MessageSquare },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 glass">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link to="/" className="flex items-center gap-2 group">
            <motion.div 
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.3 }}
              className="bg-gradient-to-tr from-green-500 to-blue-500 p-2 rounded-xl text-white shadow-lg"
            >
              <Leaf className="h-6 w-6" />
            </motion.div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
              NutriAI
            </span>
          </Link>
          
          <div className="hidden sm:flex gap-8 items-center">
            {links.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                className="relative group flex items-center gap-2 text-sm font-medium transition-colors hover:text-green-600"
              >
                <link.icon className={`h-4 w-4 ${location.pathname === link.path ? 'text-green-600' : 'text-gray-500 group-hover:text-green-500'}`} />
                <span className={location.pathname === link.path ? "text-green-600 font-semibold" : "text-gray-600"}>
                  {link.name}
                </span>
                {location.pathname === link.path && (
                  <motion.div 
                    layoutId="underline"
                    className="absolute -bottom-2 left-0 right-0 h-0.5 bg-green-500 rounded-full" 
                  />
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
