import React, { useState, useEffect } from 'react';
import { Cpu, Database, GitMerge, Shield, Code, BrainCircuit, Github, Linkedin, MessageSquare } from 'lucide-react';

const AbstractWebsite = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const [brainPulse, setBrainPulse] = useState(1);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Brain pulse animation
  useEffect(() => {
    const pulseDuration = 2000; // 2 seconds
    const interval = setInterval(() => {
      setBrainPulse((prev) => (prev === 1 ? 1.1 : 1));
    }, pulseDuration);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-400 via-blue-600 to-purple-700 text-white overflow-x-hidden">
      {/* Floating Particles */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute w-2 h-2 rounded-full bg-white opacity-60"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 10}s infinite ease-in-out`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>
      
      {/* Abstract Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-pink-500 opacity-20 blur-3xl" 
             style={{transform: `translateY(${scrollPosition * 0.2}px)`}}></div>
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 rounded-full bg-purple-600 opacity-20 blur-3xl"
             style={{transform: `translateY(${-scrollPosition * 0.1}px)`}}></div>
        <div className="absolute top-1/2 right-1/4 w-80 h-80 rounded-full bg-blue-500 opacity-20 blur-3xl"
             style={{transform: `translateY(${-scrollPosition * 0.15}px)`}}></div>
      </div>
      
      {/* Animated Grid Lines - lighter and more subtle */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 grid grid-cols-12 gap-4">
          {Array(12).fill(0).map((_, i) => (
            <div key={`v-${i}`} className="h-screen w-px bg-gradient-to-b from-transparent via-white to-transparent" style={{ transform: `translateX(${i * 8.33}vw)` }}></div>
          ))}
          {Array(12).fill(0).map((_, i) => (
            <div key={`h-${i}`} className="w-screen h-px bg-gradient-to-r from-transparent via-white to-transparent" style={{ transform: `translateY(${i * 8.33}vh)` }}></div>
          ))}
        </div>
      </div>
      
      {/* Header Section */}
      <header className="relative z-10 py-24 px-8 md:px-16 flex flex-col items-center justify-center min-h-screen">
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight text-white drop-shadow-lg">
            Stephen Adebola
          </h1>
          <h2 className="text-xl md:text-2xl text-white font-light tracking-wider">
            Software Architect & Engineer
          </h2>
          <div className="mt-6 flex flex-col justify-center items-center space-y-2">
            {/* Logo */}
            <div className="w-16 h-16 bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm rounded-full border-2 border-white flex items-center justify-center mb-2">
              <span className="text-white font-mono font-bold text-xl">haba</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="h-2 w-2 bg-white rounded-full animate-pulse"></span>
              <p className="text-white font-mono">haba.io</p>
            </div>
          </div>
        </div>
        
        {/* Animated Brain */}
        <div className="relative w-72 h-72 mb-12 group">
          {/* Outer rings */}
          <div className="absolute inset-0 rounded-full border-4 border-white opacity-20 animate-ping" 
               style={{ animationDuration: '3s' }}></div>
          <div className="absolute inset-4 rounded-full border-2 border-white opacity-30"></div>
          <div className="absolute inset-8 rounded-full border-2 border-white opacity-40"></div>
          
          {/* Neural network lines */}
          {[...Array(8)].map((_, i) => (
            <div 
              key={i}
              className="absolute w-full h-0.5 bg-white bg-opacity-20"
              style={{ 
                top: '50%', 
                transform: `rotate(${i * 22.5}deg)`,
                animation: `pulse 3s infinite ease-in-out ${i * 0.2}s`
              }}
            ></div>
          ))}
          
          {/* Brain icon with pulse animation */}
          <div className="absolute inset-0 flex items-center justify-center" 
               style={{ transform: `scale(${brainPulse})`, transition: 'transform 2s ease-in-out' }}>
            <div className="relative">
              <BrainCircuit size={100} className="text-white drop-shadow-lg" />
              <div className="absolute inset-0 rounded-full bg-white opacity-20 blur-md animate-pulse"></div>
            </div>
          </div>
          
          {/* Neurons (dots) */}
          {[...Array(12)].map((_, i) => {
            const angle = (i * 30) * (Math.PI / 180);
            const x = Math.cos(angle) * 120;
            const y = Math.sin(angle) * 120;
            return (
              <div 
                key={i}
                className="absolute w-2 h-2 rounded-full bg-white"
                style={{ 
                  left: `calc(50% + ${x}px)`, 
                  top: `calc(50% + ${y}px)`,
                  opacity: 0.6,
                  animation: `pulse 2s infinite ease-in-out ${i * 0.15}s`
                }}
              ></div>
            );
          })}
        </div>
        
        <p className="text-white text-lg md:text-xl max-w-2xl text-center font-light leading-relaxed bg-black bg-opacity-10 backdrop-filter backdrop-blur-md p-6 rounded-xl">
          Specializing in creating intelligent systems through data, automation, governance, and cutting-edge AI & GenAI Agents.
        </p>
        
        {/* Social Links */}
        <div className="flex space-x-6 mt-8">
          <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="transform hover:scale-110 transition-transform">
            <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-md p-3 rounded-full border border-white hover:bg-opacity-20">
              <Linkedin size={24} className="text-white" />
            </div>
          </a>
          <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="transform hover:scale-110 transition-transform">
            <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-md p-3 rounded-full border border-white hover:bg-opacity-20">
              <Github size={24} className="text-white" />
            </div>
          </a>
        </div>
        
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </header>
      
      {/* Expertise Section */}
      <section className="relative z-10 py-24 px-8 md:px-16 min-h-screen flex flex-col justify-center bg-gradient-to-b from-indigo-600 to-purple-800">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center tracking-tight text-white drop-shadow-lg">
          Areas of Expertise
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <ExpertiseCard 
            icon={<Database size={40} />}
            title="Data Engineering"
            description="Building scalable data pipelines and architectures that transform raw information into actionable insights."
            color="from-blue-400 to-blue-600"
            delay={0}
          />
          
          <ExpertiseCard 
            icon={<GitMerge size={40} />}
            title="Automation"
            description="Creating intelligent workflows and systems that reduce human intervention and increase operational efficiency."
            color="from-purple-400 to-purple-600"
            delay={0.1}
          />
          
          <ExpertiseCard 
            icon={<Shield size={40} />}
            title="Governance"
            description="Implementing frameworks that ensure data integrity, security, and compliance across enterprise systems."
            color="from-pink-400 to-pink-600"
            delay={0.2}
          />
          
          <ExpertiseCard 
            icon={<BrainCircuit size={40} />}
            title="AI & GenAI"
            description="Developing cutting-edge artificial intelligence solutions that solve complex business problems."
            color="from-indigo-400 to-indigo-600"
            delay={0.3}
          />
          
          <ExpertiseCard 
            icon={<Cpu size={40} />}
            title="Agent Architecture"
            description="Designing autonomous agent systems that can perceive, reason, and take action in complex environments."
            color="from-cyan-400 to-cyan-600"
            delay={0.4}
          />
          
          <ExpertiseCard 
            icon={<Code size={40} />}
            title="Software Engineering"
            description="Building robust, scalable, and maintainable software systems using modern best practices."
            color="from-violet-400 to-violet-600"
            delay={0.5}
          />
        </div>
      </section>
      
      {/* Connect Section */}
      <section className="relative z-10 py-24 px-8 md:px-16 min-h-screen flex flex-col justify-center items-center text-center bg-gradient-to-b from-purple-900 to-indigo-900">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight text-white drop-shadow-lg">
          Let's Build the Future Together
        </h2>
        
        <p className="text-xl text-white max-w-2xl mb-12 font-light">
          Looking to transform your business with intelligent automation and AI solutions? Let's connect and explore the possibilities.
        </p>
        
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-white rounded-lg blur opacity-30 group-hover:opacity-70 transition duration-1000 group-hover:duration-200"></div>
          <button className="relative px-8 py-4 bg-indigo-600 bg-opacity-50 backdrop-filter backdrop-blur-md rounded-lg leading-none flex items-center border border-white border-opacity-20">
            <span className="text-white group-hover:text-white transition duration-200">Connect with Stephen</span>
            <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
        
        {/* Flowise Chatbot Button */}
        <div className="fixed bottom-6 right-6 z-50">
          <div className="relative">
            <button 
              onClick={() => setChatbotOpen(!chatbotOpen)} 
              className="bg-white text-indigo-600 rounded-full p-4 shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            >
              <MessageSquare size={28} />
            </button>
            
            {/* Chatbot Container - This is where you'd place your Flowise code */}
            {chatbotOpen && (
              <div className="absolute bottom-16 right-0 w-80 h-96 bg-indigo-900 bg-opacity-80 backdrop-filter backdrop-blur-md rounded-lg shadow-2xl border border-white border-opacity-20 overflow-hidden">
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-3 flex justify-between items-center">
                  <span className="text-white font-medium">AI Assistant</span>
                  <button onClick={() => setChatbotOpen(false)} className="text-white hover:text-gray-200">
                    &times;
                  </button>
                </div>
                <div className="p-4 text-center text-white flex items-center justify-center h-full">
                  {/* This is where you'd insert your Flowise chatbot script */}
                  <div>
                    <p className="mb-2">Flowise Chatbot Placeholder</p>
                    <p className="text-xs">Add your Flowise script here</p>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 text-xs text-center text-white text-opacity-70 py-1">
                  Powered by haba.io
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-24 text-center">
          <div className="inline-flex items-center space-x-2 text-sm text-white">
            <span>© {new Date().getFullYear()}</span>
            <span className="font-mono font-semibold text-white">haba.io</span>
          </div>
          <p className="mt-2 text-xs text-white text-opacity-70">Building intelligent systems for a better tomorrow</p>
        </div>
      </section>
      
      {/* Flowise Chatbot Integration Note */}
      <div className="hidden">
        {/* 
          Note: To add your Flowise chatbot, you'll need to:
          1. Create a separate script tag in your HTML file
          2. Reference your Flowise chatbot there
          3. Configure it with your specific chatflow ID
          
          The UI elements for the chatbot are already prepared in this React component
          but the actual script should be added to your HTML separately.
        */}
      </div>
      
      {/* CSS Animations */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

// Expertise Card Component
const ExpertiseCard = ({ icon, title, description, color, delay }) => {
  return (
    <div 
      className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-md border border-white border-opacity-20 rounded-lg p-6 transform hover:scale-105 transition-all duration-300 hover:bg-opacity-20"
      style={{ 
        animationDelay: `${delay}s`,
        transitionDelay: `${delay}s`,
        opacity: 1
      }}
    >
      <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${color} flex items-center justify-center mb-4 shadow-lg`}>
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3 text-white">{title}</h3>
      <p className="text-white text-opacity-80">{description}</p>
    </div>
  );
};

export default AbstractWebsite;