import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { Message, Visualization, FileAttachment, Conversation, ConversationSummary, ConversationTopic } from '../types';
import { conversations } from '../data/conversations';
import { usePersona } from './PersonaContext';
import { v4 as uuidv4 } from 'uuid';

interface ChatContextProps {
  messages: Message[];
  sendMessage: (text: string) => void;
  sendFileAttachments: (files: File[]) => void;
  resetConversation: () => void;
  triggerConversation: (conversationId: string) => void;
  isTyping: boolean;
  currentConversationId: string | null;
  savedConversations: ConversationSummary[];
  loadConversation: (conversationId: string) => void;
  saveCurrentConversation: (title?: string) => void;
  deleteConversation: (conversationId: string) => void;
}

const ChatContext = createContext<ChatContextProps | null>(null);

const STORAGE_KEY = 'nolij_conversations';

interface ChatProviderProps {
  children: React.ReactNode;
  onNewMessage?: () => void;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ 
  children,
  onNewMessage 
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const [savedConversations, setSavedConversations] = useState<ConversationSummary[]>([]);
  const { activePersona } = usePersona();

  // Load saved conversations from localStorage on mount
  useEffect(() => {
    const storedConversations = localStorage.getItem(STORAGE_KEY);
    if (storedConversations) {
      try {
        const parsed = JSON.parse(storedConversations);
        const summaries: ConversationSummary[] = Object.values(parsed).map((conv: Conversation) => ({
          id: conv.id,
          title: conv.title,
          lastMessage: conv.messages[conv.messages.length - 1]?.text.substring(0, 50) + '...' || 'Empty conversation',
          timestamp: conv.updated,
          messageCount: conv.messages.length
        }));
        setSavedConversations(summaries);
      } catch (e) {
        console.error('Failed to parse stored conversations', e);
      }
    }
  }, []);

  // Save conversation to localStorage
  const saveConversationToStorage = useCallback((conversation: Conversation) => {
    const storedConversations = localStorage.getItem(STORAGE_KEY);
    let conversations = {};
    
    if (storedConversations) {
      try {
        conversations = JSON.parse(storedConversations);
      } catch (e) {
        console.error('Failed to parse stored conversations', e);
      }
    }
    
    conversations = {
      ...conversations,
      [conversation.id]: conversation
    };
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));
    
    // Update savedConversations state
    const summaries: ConversationSummary[] = Object.values(conversations).map((conv: Conversation) => ({
      id: conv.id,
      title: conv.title,
      lastMessage: conv.messages[conv.messages.length - 1]?.text.substring(0, 50) + '...' || 'Empty conversation',
      timestamp: conv.updated,
      messageCount: conv.messages.length
    }));
    
    setSavedConversations(summaries);
  }, []);

  // Load conversation from localStorage
  const loadConversation = useCallback((conversationId: string) => {
    const storedConversations = localStorage.getItem(STORAGE_KEY);
    if (storedConversations) {
      try {
        const conversations = JSON.parse(storedConversations);
        const conversation = conversations[conversationId];
        
        if (conversation) {
          setMessages(conversation.messages);
          setCurrentConversationId(conversationId);
        }
      } catch (e) {
        console.error('Failed to load conversation', e);
      }
    }
  }, []);

  // Save current conversation
  const saveCurrentConversation = useCallback((title?: string) => {
    if (messages.length === 0) return;
    
    const conversationId = currentConversationId || uuidv4();
    const now = Date.now();
    
    const conversation: Conversation = {
      id: conversationId,
      title: title || `Conversation ${new Date(now).toLocaleString()}`,
      messages,
      created: currentConversationId ? getSavedConversationField(conversationId, 'created') || now : now,
      updated: now
    };
    
    saveConversationToStorage(conversation);
    setCurrentConversationId(conversationId);
  }, [messages, currentConversationId, saveConversationToStorage]);

  // Helper to get a field from a saved conversation
  const getSavedConversationField = (id: string, field: keyof Conversation) => {
    const storedConversations = localStorage.getItem(STORAGE_KEY);
    if (storedConversations) {
      try {
        const conversations = JSON.parse(storedConversations);
        return conversations[id]?.[field];
      } catch (e) {
        console.error('Failed to get conversation field', e);
      }
    }
    return null;
  };

  // Delete conversation
  const deleteConversation = useCallback((conversationId: string) => {
    const storedConversations = localStorage.getItem(STORAGE_KEY);
    if (storedConversations) {
      try {
        const conversations = JSON.parse(storedConversations);
        delete conversations[conversationId];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));
        
        // Update savedConversations state
        const summaries: ConversationSummary[] = Object.values(conversations).map((conv: Conversation) => ({
          id: conv.id,
          title: conv.title,
          lastMessage: conv.messages[conv.messages.length - 1]?.text.substring(0, 50) + '...' || 'Empty conversation',
          timestamp: conv.updated,
          messageCount: conv.messages.length
        }));
        
        setSavedConversations(summaries);
        
        // If the deleted conversation was the current one, reset
        if (currentConversationId === conversationId) {
          setMessages([]);
          setCurrentConversationId(null);
        }
      } catch (e) {
        console.error('Failed to delete conversation', e);
      }
    }
  }, [currentConversationId]);

  const simulateResponse = useCallback(
    async (userMessage: string, attachments?: FileAttachment[]): Promise<Message> => {
      // In a real app, this would call an API
      setIsTyping(true);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      let responseText = "";
      let visualization: Visualization | undefined = undefined;
      let responseAttachments: FileAttachment[] | undefined = undefined;
      
      // Process file attachments
      if (attachments && attachments.length > 0) {
        responseText = activePersona === 'professional'
          ? `I've received ${attachments.length} file${attachments.length > 1 ? 's' : ''}. Let me analyze ${attachments.length > 1 ? 'them' : 'it'} for you.\n\n`
          : `Thanks for sending ${attachments.length > 1 ? 'those files' : 'that file'}! I'll take a look and extract the important information for you.\n\n`;
        
        // Add specific response based on file types
        const docTypes = attachments.filter(a => a.type.includes('pdf') || a.type.includes('word') || a.type.includes('text'));
        const imageTypes = attachments.filter(a => a.type.includes('image'));
        
        if (docTypes.length > 0) {
          responseText += activePersona === 'professional'
            ? `I've analyzed the document${docTypes.length > 1 ? 's' : ''} and extracted the following technical specifications:\n\n`
            : `I've looked through your document${docTypes.length > 1 ? 's' : ''} and found these important details:\n\n`;
          
          responseText += "- SW-24-POE Switch (1 unit needed)\n";
          responseText += "- POE-CORD-NA is missing but required\n";
          responseText += "- NET-ADV-1YR License recommended for full functionality\n\n";
          
          visualization = {
            type: 'network-diagram',
            data: {
              title: 'Network Component Relationship',
              nodes: [
                { id: '1', name: 'SW-24-POE', group: 'switch', size: 2 },
                { id: '2', name: 'Security Camera', group: 'camera', size: 1 },
                { id: '3', name: 'VoIP Phone', group: 'phone', size: 1 },
                { id: '4', name: 'Access Point', group: 'accesspoint', size: 1 },
                { id: '5', name: 'Power Source', group: 'server', size: 1.5 },
                { id: '6', name: 'Network Controller', group: 'server', size: 1.5 },
              ],
              links: [
                { source: '1', target: '2', type: 'network', value: 2 },
                { source: '1', target: '3', type: 'network', value: 2 },
                { source: '1', target: '4', type: 'network', value: 2 },
                { source: '5', target: '1', type: 'power', value: 3 },
                { source: '6', target: '1', type: 'network', value: 1 },
                { source: '4', target: '2', type: 'wireless', value: 1 },
              ]
            }
          };
        }
        
        if (imageTypes.length > 0) {
          responseText += activePersona === 'professional'
            ? `I've also analyzed the visual content of the supplied diagram${imageTypes.length > 1 ? 's' : ''} and identified the network architecture. `
            : `I looked at the diagram${imageTypes.length > 1 ? 's' : ''} you sent and understood how everything connects. `;
          
          responseText += "The configuration requires proper power distribution for the PoE devices.";
        }
      } 
      // Simple keyword matching for regular text messages
      else if (userMessage.toLowerCase().includes("switch") || 
          userMessage.toLowerCase().includes("configuration")) {
        responseText = activePersona === 'professional'
          ? "I've analyzed the switch configuration. Your quote is missing the POE-CORD-NA power cord required for PoE operation. Additionally, I recommend adding NET-ADV-1YR license for advanced features."
          : "Hey there! I looked at your switch setup and noticed you're missing the power cord (POE-CORD-NA) that you'll need for those PoE devices. Also, don't forget to add the NET-ADV-1YR license if you want all the cool advanced features! 😊";
          
        visualization = {
          type: 'compatibility-matrix',
          data: {
            title: 'SW-24-POE Compatibility',
            headers: ['PoE Devices', 'AC Input', 'Controller'],
            rows: [
              { 
                name: 'SW-24-POE', 
                values: ['compatible', 'warning', 'compatible'] 
              }
            ]
          }
        };
      } else if (userMessage.toLowerCase().includes("alternative") || 
                 userMessage.toLowerCase().includes("replacement") ||
                 userMessage.toLowerCase().includes("compare")) {
        responseText = activePersona === 'professional'
          ? "Based on your requirements, I've prepared a detailed comparison of the discontinued SW-48-PRO switch with suitable alternatives. The SW-48-PRO-PLUS offers enhanced capabilities, while the SW-48-STD provides a more cost-effective option with fewer advanced features."
          : "Good news! Since the SW-48-PRO is discontinued, I've found a couple of great options for you. I've put together a detailed comparison so you can see how they stack up against each other!";
          
        visualization = {
          type: 'product-comparison',
          data: {
            title: 'Product Comparison',
            originalProduct: {
              id: '001',
              name: '48-Port Pro Switch',
              sku: 'SW-48-PRO',
              status: 'eol',
              price: 3999,
              specs: {
                ports: '48x 1GbE, 4x 10GbE SFP+',
                powerCapacity: 740,
                throughput: 176,
                stackable: true,
                layer3Support: true,
                managementInterface: 'Standard',
                warranty: 3,
                rackmountWidth: 19
              }
            },
            alternatives: [
              {
                id: '002',
                name: '48-Port Pro+ Switch',
                sku: 'SW-48-PRO-PLUS',
                status: 'available',
                price: 4599,
                matchScore: 98,
                specs: {
                  ports: '48x 1GbE, 4x 25GbE SFP28',
                  powerCapacity: 820,
                  throughput: 200,
                  stackable: true,
                  layer3Support: true,
                  managementInterface: 'Enhanced',
                  warranty: 5,
                  rackmountWidth: 19
                }
              },
              {
                id: '003',
                name: '48-Port Standard Switch',
                sku: 'SW-48-STD',
                status: 'available',
                price: 2999,
                matchScore: 82,
                specs: {
                  ports: '48x 1GbE, 2x 10GbE SFP+',
                  powerCapacity: 740,
                  throughput: 160,
                  stackable: false,
                  layer3Support: false,
                  managementInterface: 'Basic',
                  warranty: 3,
                  rackmountWidth: 19
                }
              }
            ],
            specCategories: [
              {
                name: 'Performance',
                specs: ['ports', 'throughput', 'stackable']
              },
              {
                name: 'Power',
                specs: ['powerCapacity']
              },
              {
                name: 'Features',
                specs: ['layer3Support', 'managementInterface', 'warranty', 'rackmountWidth']
              }
            ]
          }
        };
      } else if (userMessage.toLowerCase().includes("budget") || 
                 userMessage.toLowerCase().includes("power")) {
        responseText = activePersona === 'professional'
          ? "I've analyzed your PoE budget requirements using advanced visualization. The SW-24-POE provides 370W of PoE power. Your current configuration with 12 cameras (5W each) and 8 phones (7W each) requires a total of 116W, which is well within the switch's capacity."
          : "Let's check your power budget with a cool interactive chart! Your SW-24-POE gives you 370W of PoE power. Looking at what you have - 12 cameras using 5W each and 8 phones needing 7W each - that adds up to 116W total. Great news! You're only using about 1/3 of your available power, so you're all set!";
          
        visualization = {
          type: 'interactive-bar-chart',
          data: {
            title: 'PoE Power Budget',
            labels: ['Available', 'Used', 'Remaining'],
            values: [370, 116, 254],
            maxValue: 400,
            unit: 'W',
            descriptions: [
              'Total power capacity of the SW-24-POE',
              'Current power usage by all connected devices',
              'Available power for additional devices'
            ],
            color: '#3B82F6'
          }
        };
      } else {
        responseText = activePersona === 'professional'
          ? "I can help validate your hardware configurations, check compatibility, and suggest alternatives for EOL products. What specific quote or configuration would you like me to analyze?"
          : "Hi there! I'm here to help you check if your hardware setup is good to go, make sure everything works together, and find alternatives if something's discontinued. What can I help you with today?";
      }

      setIsTyping(false);
      
      return {
        sender: 'agent',
        text: responseText,
        persona: activePersona,
        visualization,
        attachments: responseAttachments,
        timestamp: Date.now()
      };
    },
    [activePersona]
  );

  const sendMessage = useCallback(
    async (text: string) => {
      const userMessage = {
        sender: 'user',
        text,
        timestamp: Date.now()
      };
      
      setMessages(prev => [...prev, userMessage]);
      
      const response = await simulateResponse(text);
      setMessages(prev => [...prev, response]);
      
      // Auto-save conversation after new messages
      if (currentConversationId) {
        saveCurrentConversation();
      }
      
      if (onNewMessage) onNewMessage();
    },
    [simulateResponse, onNewMessage, currentConversationId, saveCurrentConversation]
  );

  const sendFileAttachments = useCallback(
    async (files: File[]) => {
      // Create file attachment objects
      const fileAttachments: FileAttachment[] = Array.from(files).map(file => ({
        id: uuidv4(),
        name: file.name,
        type: file.type,
        size: file.size,
        status: 'uploading',
        progress: 0
      }));
      
      // Add user message with attachments
      const userMessage: Message = {
        sender: 'user',
        text: files.length === 1 
          ? `I'm sending you the file "${files[0].name}" for analysis.` 
          : `I'm sending you ${files.length} files for analysis.`,
        attachments: fileAttachments,
        timestamp: Date.now()
      };
      
      setMessages(prev => [...prev, userMessage]);
      
      // Simulate file upload progress
      const updatedAttachments = [...fileAttachments];
      for (let i = 0; i <= 100; i += 20) {
        await new Promise(resolve => setTimeout(resolve, 200));
        
        // Update progress for all attachments
        updatedAttachments.forEach(attachment => {
          attachment.progress = i;
        });
        
        // Update the message with new progress
        setMessages(prev => prev.map((msg, idx) => 
          idx === prev.length - 1 && msg.sender === 'user' 
            ? { ...msg, attachments: [...updatedAttachments] } 
            : msg
        ));
      }
      
      // Set attachments to complete
      updatedAttachments.forEach(attachment => {
        attachment.status = 'complete';
        attachment.progress = 100;
      });
      
      // Update the message with completed attachments
      setMessages(prev => prev.map((msg, idx) => 
        idx === prev.length - 1 && msg.sender === 'user' 
          ? { ...msg, attachments: [...updatedAttachments] } 
          : msg
      ));
      
      // Generate agent response for the files
      const response = await simulateResponse("", updatedAttachments);
      setMessages(prev => [...prev, response]);
      
      // Auto-save conversation after new messages
      if (currentConversationId) {
        saveCurrentConversation();
      }
      
      if (onNewMessage) onNewMessage();
    },
    [simulateResponse, onNewMessage, currentConversationId, saveCurrentConversation]
  );

  const resetConversation = useCallback(() => {
    setMessages([]);
    setCurrentConversationId(null);
  }, []);

  const triggerConversation = useCallback(
    (conversationId: string) => {
      const conversation = conversations[conversationId];
      if (!conversation) return;
      
      resetConversation();
      
      let delay = 0;
      const playConversation = async () => {
        for (const message of conversation.messages) {
          await new Promise(resolve => setTimeout(resolve, delay));
          
          if (message.sender === 'user') {
            setMessages(prev => [...prev, {
              ...message,
              text: message.text,
              timestamp: Date.now()
            }]);
            delay = 500; // Short delay after user message
          } else {
            setIsTyping(true);
            await new Promise(resolve => setTimeout(resolve, 1000)); // Typing delay
            setIsTyping(false);
            
            setMessages(prev => [...prev, {
              ...message,
              persona: activePersona,
              timestamp: Date.now()
            }]);
            if (onNewMessage) onNewMessage();
            delay = 1000; // Longer delay after agent message
          }
        }
      };
      
      playConversation();
    },
    [resetConversation, activePersona, onNewMessage]
  );

  const value = {
    messages,
    sendMessage,
    sendFileAttachments,
    resetConversation,
    triggerConversation,
    isTyping,
    currentConversationId,
    savedConversations,
    loadConversation,
    saveCurrentConversation,
    deleteConversation
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
};