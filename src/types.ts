export interface Message {
  sender: 'user' | 'agent';
  text: string;
  isTyping?: boolean;
  persona?: 'professional' | 'conversational';
  visualization?: Visualization;
  attachments?: FileAttachment[];
  timestamp?: number;
}

export interface Visualization {
  type: string;
  data: any;
}

export interface FileAttachment {
  id: string;
  name: string;
  type: string;
  size: number;
  status: 'uploading' | 'processing' | 'complete' | 'error';
  progress?: number;
  url?: string;
  error?: string;
}

export interface ConversationSummary {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: number;
  messageCount: number;
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  created: number;
  updated: number;
}

export interface ConversationTopic {
  id: string;
  title: string;
  description: string;
  icon: string;
  messages: Message[];
}