import React, { useState, useEffect, useRef } from 'react';

// Mock AI responses - in a real app, you would use the OpenAI API
const AI_RESPONSES = {
  greeting: "Hello! I'm your AI assistant. How can I help with your funnel?",
  funnel: [
    "Consider adding a video to increase engagement by 80%.",
    "Your headline could be more compelling. Try addressing a pain point.",
    "Adding social proof like testimonials can boost conversions by 15%.",
    "Your form has too many fields. Consider reducing it to improve completion rates.",
    "The button color could be more attention-grabbing. Try using a contrasting color.",
    "Make sure your value proposition is clear above the fold.",
  ],
  default: "I'm analyzing your funnel. Here's a tip: make sure your CTA is clear and compelling."
};

// Mock API call - in a real app, this would be an actual API call
const mockAiResponse = (message) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (message.toLowerCase().includes('hello') || message.toLowerCase().includes('hi')) {
        resolve(AI_RESPONSES.greeting);
      } else if (
        message.toLowerCase().includes('funnel') ||
        message.toLowerCase().includes('convert') ||
        message.toLowerCase().includes('improve')
      ) {
        const randomIndex = Math.floor(Math.random() * AI_RESPONSES.funnel.length);
        resolve(AI_RESPONSES.funnel[randomIndex]);
      } else {
        resolve(AI_RESPONSES.default);
      }
    }, 1000);
  });
};

const AiChat = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: AI_RESPONSES.greeting, sender: 'ai' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to the bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage = { id: Date.now(), text: input, sender: 'user' };
    setMessages([...messages, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      // Get AI response
      const aiResponse = await mockAiResponse(input);
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: Date.now() + 1, text: aiResponse, sender: 'ai' }
      ]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { 
          id: Date.now() + 1, 
          text: "Sorry, I couldn't process your request. Please try again.", 
          sender: 'ai' 
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  // Suggestion buttons for quick interactions
  const suggestions = [
    "How can I improve my funnel?",
    "What's a good headline?",
    "How many form fields should I use?",
  ];

  const handleSuggestion = (suggestion) => {
    setInput(suggestion);
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-4 bg-indigo-600 text-white">
        <h3 className="font-medium">AI Marketing Assistant</h3>
      </div>
      
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[75%] rounded-lg p-3 ${
                message.sender === 'user'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-800 rounded-lg p-3">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-2 space-x-2 flex flex-wrap">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion}
            onClick={() => handleSuggestion(suggestion)}
            className="text-xs bg-gray-100 hover:bg-gray-200 rounded-full px-3 py-1 mb-2"
          >
            {suggestion}
          </button>
        ))}
      </div>
      
      <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-200">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask for marketing advice..."
            className="flex-grow p-2 border border-gray-300 rounded-md"
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" 
              />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AiChat;
