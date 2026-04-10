import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Send, User, Bot, Loader2, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Chatbot() {
  const [messages, setMessages] = useState([{ sender: "ai", text: "Hello! I am your AI Nutrition Expert. How can I help you meet your health goals today?" }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endOfMessagesRef = useRef(null);

  const suggestedQuestions = [
    "What's a high protein breakfast?",
    "How to eat healthy on a budget?",
    "Give me a quick vegan dinner recipe."
  ];

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const sendMessage = async (e, customMsg = null) => {
    if (e) e.preventDefault();
    const userMsg = customMsg || input;
    if (!userMsg.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", text: userMsg }]);
    setInput("");
    setLoading(true);

    try {
      // Hardcoded user_id for demo
      const res = await axios.post("http://localhost:8000/api/chat/", { message: userMsg, user_id: 1 });
      setMessages((prev) => [...prev, { sender: "ai", text: res.data.reply }]);
    } catch (err) {
      setMessages((prev) => [...prev, { sender: "ai", text: "Error connecting to AI service." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 h-[85vh] flex flex-col">
      <div className="bg-white/80 backdrop-blur-md border border-gray-200 rounded-t-3xl shadow-lg flex-grow flex flex-col overflow-hidden relative">
        <div className="absolute inset-0 bg-slate-50/50 -z-10" />
        
        {/* Header */}
        <div className="bg-white/90 backdrop-blur-md border-b border-gray-100 p-4 flex items-center justify-between shadow-sm z-10 relative">
          <div className="flex items-center gap-3">
             <div className="relative">
               <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-green-400 flex items-center justify-center text-white shadow-md">
                 <Bot size={20} />
               </div>
               <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
             </div>
             <div>
               <h2 className="font-bold text-gray-800">AI Nutritionist</h2>
               <p className="text-xs text-green-600 font-medium">Online</p>
             </div>
          </div>
          <button className="text-gray-400 hover:text-blue-500 transition-colors p-2 bg-gray-50 rounded-full">
            <Info size={20} />
          </button>
        </div>

        {/* Chat Area */}
        <div className="flex-grow p-6 overflow-y-auto space-y-6">
          <AnimatePresence>
            {messages.map((msg, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                key={i} 
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className={`flex items-end max-w-[85%] gap-2 ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm ${msg.sender === "user" ? "bg-gradient-to-tr from-green-600 to-green-500 text-white hidden sm:flex" : "bg-gradient-to-tr from-blue-500 to-blue-600 text-white"}`}>
                    {msg.sender === "user" ? <User size={14} /> : <Bot size={14} />}
                  </div>
                  <div className={`px-5 py-3.5 rounded-3xl ${msg.sender === "user" ? "bg-gradient-to-br from-green-500 to-green-600 text-white rounded-br-none shadow-md shadow-green-500/20" : "bg-white border border-gray-100 text-gray-800 rounded-bl-none shadow-sm"}`}>
                    <p className="text-[15px] leading-relaxed">{msg.text}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {loading && (
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
               <div className="flex items-end gap-2">
                 <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0 text-white shadow-sm"><Bot size={14} /></div>
                 <div className="px-5 py-4 rounded-3xl bg-white border border-gray-100 text-gray-500 rounded-bl-none shadow-sm flex gap-1">
                    <motion.div className="w-2 h-2 bg-blue-400 rounded-full" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} />
                    <motion.div className="w-2 h-2 bg-blue-400 rounded-full" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} />
                    <motion.div className="w-2 h-2 bg-blue-400 rounded-full" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} />
                 </div>
               </div>
             </motion.div>
          )}
          <div ref={endOfMessagesRef} />
        </div>

        {/* Suggested Questions */}
        {messages.length === 1 && !loading && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="px-6 pb-2 flex gap-2 overflow-x-auto no-scrollbar">
            {suggestedQuestions.map((q, idx) => (
              <button 
                key={idx} 
                onClick={() => sendMessage(null, q)}
                className="whitespace-nowrap px-4 py-2 bg-blue-50 border border-blue-100 text-blue-700 rounded-full text-sm font-medium hover:bg-blue-100 transition-colors shadow-sm"
              >
                {q}
              </button>
            ))}
          </motion.div>
        )}
      </div>

      <form onSubmit={sendMessage} className="bg-white border-x border-b border-gray-200 rounded-b-3xl p-4 flex gap-3 shadow-lg relative z-20">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a nutrition question..."
          className="flex-grow px-5 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 focus:bg-white outline-none transition-all"
        />
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit" 
          disabled={!input.trim() || loading} 
          className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 rounded-2xl shadow-md hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          <Send className="w-5 h-5 ml-1" />
        </motion.button>
      </form>
    </div>
  );
}
