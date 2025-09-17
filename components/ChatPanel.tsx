
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, CloudProvider, AIService } from '../types';
import { Message } from './Message';
import { SendIcon } from './icons/SendIcon';

interface ChatPanelProps {
  messages: ChatMessage[];
  onSendMessage: (message: string, provider: CloudProvider, service: AIService) => void;
  isLoading: boolean;
}

export const ChatPanel: React.FC<ChatPanelProps> = ({ messages, onSendMessage, isLoading }) => {
  const [input, setInput] = useState('');
  const [selectedProvider, setSelectedProvider] = useState<CloudProvider>(CloudProvider.AWS);
  const [selectedService, setSelectedService] = useState<AIService>(AIService.GEMINI);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages, isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim(), selectedProvider, selectedService);
      setInput('');
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-800 border-r border-slate-700">
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col">
          {messages.map((msg) => (
            <Message key={msg.id} message={msg} />
          ))}
          {isLoading && (
            <div className="flex items-center justify-start p-4 gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-sky-500 animate-pulse"></div>
              <div className="flex items-center gap-1 text-slate-400">
                <span>AI is thinking</span>
                <span className="animate-bounce delay-0">.</span>
                <span className="animate-bounce delay-150">.</span>
                <span className="animate-bounce delay-300">.</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="p-4 border-t border-slate-700">
        <div className="mb-3">
            <label htmlFor="ai-service" className="block text-sm font-medium text-slate-400 mb-1">
              AI Service
            </label>
            <select
              id="ai-service"
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value as AIService)}
              className="w-full p-2.5 bg-slate-700 rounded-lg text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
              disabled={isLoading}
            >
              <option value={AIService.GEMINI}>Gemini</option>
              <option value={AIService.AZURE}>Azure OpenAI</option>
            </select>
        </div>
        <div className="mb-3">
          <label htmlFor="cloud-provider" className="block text-sm font-medium text-slate-400 mb-1">
            Cloud Provider
          </label>
          <select
            id="cloud-provider"
            value={selectedProvider}
            onChange={(e) => setSelectedProvider(e.target.value as CloudProvider)}
            className="w-full p-2.5 bg-slate-700 rounded-lg text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
            disabled={isLoading}
          >
            <option value={CloudProvider.AWS}>AWS</option>
            <option value={CloudProvider.AZURE}>Azure</option>
            <option value={CloudProvider.GCP}>GCP</option>
          </select>
        </div>
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g., Create a secure AWS S3 bucket..."
            className="flex-1 p-3 bg-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="p-3 bg-sky-600 rounded-lg text-white hover:bg-sky-500 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors"
          >
            <SendIcon className="w-6 h-6" />
          </button>
        </form>
      </div>
    </div>
  );
};
