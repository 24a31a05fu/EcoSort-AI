import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useApp } from '../context/AppContext';
import { MessageSquare, Bot, User, Send } from 'lucide-react';

export default function Chatbot() {
  const { language, chatHistory, setChatHistory, t } = useApp();
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleChatSubmit = async (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    setInput('');
    const userMessage = { text, isUser: true };
    setChatHistory((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const res = await axios.post('/api/chatbot', {
        message: text,
        language: language
      });
      const botMessage = { text: res.data.reply, isUser: false };
      setChatHistory((prev) => [...prev, botMessage]);
    } catch (err) {
      const errorMessage = { text: "Sorry, I'm having trouble connecting to my knowledge base right now.", isUser: false };
      setChatHistory((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const formatText = (text) => {
    // Basic Markdown formatting helper
    return text.split('\n').map((line, idx) => {
      // Bold syntax
      const formatted = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      return (
        <span key={idx} className="block mt-1">
          <span dangerouslySetInnerHTML={{ __html: formatted }} />
        </span>
      );
    });
  };

  return (
    <div className="glass-card rounded-3xl p-6 sm:p-8 border border-emerald-500/10 max-w-4xl mx-auto flex flex-col h-[70vh] justify-between fade-in">
      <div>
        <h2 className="text-2xl font-bold font-outfit text-slate-800 dark:text-white flex items-center space-x-2">
          <MessageSquare className="w-6 h-6 text-emerald-500 animate-bounce" />
          <span>{t('chatbot_title')}</span>
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 pb-4 border-b border-slate-100 dark:border-slate-800">
          {t('chatbot_desc')}
        </p>
      </div>

      {/* Message Area */}
      <div className="flex-grow overflow-y-auto my-4 space-y-4 pr-2 scrollbar-thin">
        {/* Chat Greeting */}
        <div className="flex items-start space-x-3">
          <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-500 mt-1">
            <Bot className="w-5 h-5" />
          </div>
          <div className="p-4 bg-slate-100 dark:bg-slate-900 rounded-3xl max-w-[80%] rounded-tl-none">
            <p className="text-sm text-slate-700 dark:text-slate-300">
              {t('greeting')}
            </p>
          </div>
        </div>

        {/* Conversation history */}
        {chatHistory.map((chat, idx) => (
          <div key={idx} className={`flex items-start space-x-3 ${chat.isUser ? 'justify-end' : ''}`}>
            {!chat.isUser && (
              <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-500 mt-1">
                <Bot className="w-5 h-5" />
              </div>
            )}
            <div className={`p-4 rounded-3xl max-w-[80%] rounded-tl-none ${
              chat.isUser 
                ? 'bg-emerald-600 text-white rounded-tr-none' 
                : 'bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300'
            }`}>
              <p className="text-sm">{formatText(chat.text)}</p>
            </div>
            {chat.isUser && (
              <div className="p-2 bg-emerald-600/10 rounded-xl text-emerald-600 mt-1">
                <User className="w-5 h-5" />
              </div>
            )}
          </div>
        ))}
        {loading && (
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-500 mt-1 animate-pulse">
              <Bot className="w-5 h-5 animate-spin" />
            </div>
            <div className="p-4 bg-slate-100 dark:bg-slate-900 rounded-3xl text-slate-400 text-xs italic">
              AI assistant is thinking...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <form onSubmit={handleChatSubmit} className="flex items-center space-x-2 pt-4 border-t border-slate-100 dark:border-slate-800">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          required 
          placeholder={t('chat_placeholder')} 
          className="flex-grow px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none focus:border-emerald-500 text-sm transition-colors text-slate-800 dark:text-white"
        />
        <button 
          type="submit" 
          disabled={loading}
          className="p-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl shadow-lg shadow-emerald-500/15 transition-all cursor-pointer disabled:opacity-50"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
}
