import { useState, useRef, useEffect } from 'react';
import OpenAI from 'openai';
import ChatMessage from '../../components/ChatMessage';
import '../../styles/mainservice.css';
import Background from '../../components/Background';

function AICareerChatbot() {
  const [state, setState] = useState({
    messages: [{
      role: 'assistant',
      content: "Hello! I'm your AI Career Counselor. I'm here to help you with career guidance, interview preparation, and skill development. How can I assist you today?"
    }],
    isLoading: false
  });
  
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [state.messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || state.isLoading) return;

    const userMessage = { role: 'user', content: input };
    
    setState(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isLoading: true
    }));
    
    setInput('');

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are an experienced career counselor with expertise in professional development, job search strategies, and interview preparation. Provide specific, actionable advice while being empathetic and encouraging. Focus on practical steps and modern career development approaches. Maximum response size 50 words."
          },
          ...state.messages.map(msg => ({
            role: msg.role,
            content: msg.content
          })),
          { role: "user", content: input }
        ],
        temperature: 0.7,
        max_tokens: 500
      });

      const assistantMessage = {
        role: 'assistant',
        content: response.choices[0]?.message?.content || "I apologize, but I couldn't generate a response. Please try again."
      };

      setState(prev => ({
        messages: [...prev.messages, assistantMessage],
        isLoading: false
      }));
    } catch (error) {
      console.error('Error:', error);
      setState(prev => ({
        ...prev,
        messages: [...prev.messages, {
          role: 'assistant',
          content: "I apologize, but I encountered an error. Please make sure your OpenAI API key is configured correctly."
        }],
        isLoading: false
      }));
    }
  };

  return (
    <>
    <Background/>
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-3xl sm:mx-auto w-full px-4 sm:px-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20 min-h-[80vh] flex flex-col">
          <div className="max-w-2xl mx-auto w-full">
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">AI Career Counselor</h1>
  
                <div className="h-[80vh] overflow-y-auto mb-4 space-y-4 p-4">
                  {state.messages.map((message, index) => (
                    <ChatMessage key={index} message={message} />
                  ))}
                  {state.isLoading && (
                    <div className="text-center text-gray-500">Thinking...</div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
  
                <form onSubmit={handleSubmit} className="mt-4">
                  <div className="flex items-center space-x-3">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask about your career..."
                      className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={state.isLoading}
                    />
                    <button
                      type="submit"
                      disabled={state.isLoading}
                      className="bg-blue-500 text-white px-4 py-3 rounded-lg hover:bg-blue-600 transition-colors disabled:bg-blue-300"
                    >
                      Send
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
export default AICareerChatbot;  