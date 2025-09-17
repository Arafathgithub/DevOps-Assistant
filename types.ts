
export enum CloudProvider {
  AWS = 'AWS',
  AZURE = 'Azure',
  GCP = 'GCP',
}

export enum AIService {
  GEMINI = 'Gemini',
  AZURE = 'Azure OpenAI',
}

export enum MessageSender {
  USER = 'user',
  AI = 'ai',
  SYSTEM = 'system',
}

export interface ChatMessage {
  id: string;
  sender: MessageSender;
  text: string;
}

export interface Task {
  id: string;
  text: string;
  completed: boolean;
}
