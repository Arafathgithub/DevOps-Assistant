
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ChatPanel } from './components/ChatPanel';
import { CodeExplorer } from './components/CodeExplorer';
import { ChatMessage, MessageSender, CloudProvider, AIService } from './types';
import { generateTerraformScriptStream } from './services/geminiService';
import { generateTerraformScriptStreamWithAzure } from './services/azureOpenAIService';
import { GREETING_MESSAGE } from './constants';

const App: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 'initial', sender: MessageSender.AI, text: GREETING_MESSAGE },
  ]);
  const [terraformCode, setTerraformCode] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const parseCodeFromResponse = (responseText: string): string => {
    const codeBlockRegex = /```hcl\n([\s\S]*?)\n```/;
    const match = responseText.match(codeBlockRegex);
    return match ? match[1].trim() : '';
  };

  const handleSendMessage = useCallback(async (prompt: string, provider: CloudProvider, service: AIService) => {
    setIsLoading(true);
    setError(null);

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: MessageSender.USER,
      text: prompt,
    };

    setMessages(prev => [...prev, userMessage]);
    
    // Prepare for streaming AI response
    const aiResponseId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, { id: aiResponseId, sender: MessageSender.AI, text: '' }]);

    const fullPrompt = `${prompt}\n\nIMPORTANT: The target cloud provider is ${provider}.`;

    try {
      const stream = service === AIService.GEMINI
        ? await generateTerraformScriptStream(fullPrompt)
        : await generateTerraformScriptStreamWithAzure(fullPrompt);
        
      let fullResponse = '';

      for await (const chunk of stream) {
        // Ensure chunk and chunk.text are not null/undefined
        const chunkText = chunk?.text ?? '';
        fullResponse += chunkText;
        setMessages(prev =>
          prev.map(msg =>
            msg.id === aiResponseId ? { ...msg, text: fullResponse } : msg
          )
        );
      }
      
      const extractedCode = parseCodeFromResponse(fullResponse);
      if (extractedCode) {
        setTerraformCode(extractedCode);
      }

    } catch (err: any) {
      const errorMessage = `Sorry, I encountered an error: ${err.message || 'Please check your API keys and try again.'}`;
      setError(errorMessage);
      setMessages(prev => 
        prev.map(msg => msg.id === aiResponseId ? { ...msg, text: errorMessage } : msg)
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col antialiased bg-slate-900 text-slate-300">
      <Header />
      <main className="flex flex-1 min-h-0">
        <div className="w-full lg:w-1/2 flex-shrink-0">
          <ChatPanel messages={messages} onSendMessage={handleSendMessage} isLoading={isLoading} />
        </div>
        <div className="hidden lg:block lg:w-1/2 flex-shrink-0">
          <CodeExplorer code={terraformCode} />
        </div>
      </main>
    </div>
  );
};

export default App;
