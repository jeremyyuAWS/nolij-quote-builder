import React, { useState, useEffect } from 'react';
import { X, MessageSquare, Play, Check } from 'lucide-react';
import { conversations } from '../data/conversations';
import ChatMessage from './chat/ChatMessage';
import { Message } from '../types';
import { usePersona } from '../contexts/PersonaContext';

interface DemoModalProps {
  demoId: string;
  onClose: () => void;
  onTryInChat: (demoId: string) => void;
}

const DemoModal: React.FC<DemoModalProps> = ({ demoId, onClose, onTryInChat }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoPlayComplete, setAutoPlayComplete] = useState(false);
  const { activePersona } = usePersona();

  const conversation = conversations[demoId];
  
  // If conversation is undefined, prevent rendering the modal content
  if (!conversation) {
    return (
      <div className="fixed inset-0 bg-dark-900/40 z-50 flex items-center justify-center p-4 animate-fadeIn" onClick={onClose}>
        <div 
          className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col animate-slideUp"
          onClick={e => e.stopPropagation()}
        >
          <div className="p-4 border-b border-dark-200 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-dark-900">Demo Not Found</h3>
            <button onClick={onClose} className="text-dark-500 hover:text-dark-700 p-1.5 rounded-full hover:bg-dark-100">
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="p-4 flex items-center justify-center h-56">
            <p className="text-dark-500">The requested demo could not be found: {demoId}</p>
          </div>
        </div>
      </div>
    );
  }
  
  useEffect(() => {
    // Reset state when demo changes
    setMessages([]);
    setCurrentStep(0);
    setIsPlaying(false);
    setAutoPlayComplete(false);
  }, [demoId]);

  useEffect(() => {
    if (!isPlaying || !conversation) return;
    
    let timeout: NodeJS.Timeout;
    
    const playNextStep = () => {
      if (currentStep < conversation.messages.length) {
        const message = {
          ...conversation.messages[currentStep],
          // Add timestamp and persona for agent messages
          ...(conversation.messages[currentStep].sender === 'agent' ? { 
            persona: activePersona,
            timestamp: Date.now()
          } : {
            timestamp: Date.now()
          })
        };
        
        setMessages(prev => [...prev, message]);
        setCurrentStep(prev => prev + 1);
        
        // Set timing for next message
        const delay = message.sender === 'user' ? 800 : 1500;
        if (currentStep < conversation.messages.length - 1) {
          timeout = setTimeout(playNextStep, delay);
        } else {
          setIsPlaying(false);
          setAutoPlayComplete(true);
        }
      } else {
        setIsPlaying(false);
        setAutoPlayComplete(true);
      }
    };
    
    // Start playing the first step
    timeout = setTimeout(playNextStep, 500);
    
    return () => {
      clearTimeout(timeout);
    };
  }, [isPlaying, currentStep, conversation, activePersona]);

  const handleAutoPlay = () => {
    setMessages([]);
    setCurrentStep(0);
    setIsPlaying(true);
    setAutoPlayComplete(false);
  };

  return (
    <div className="fixed inset-0 bg-dark-900/40 z-50 flex items-center justify-center p-4 animate-fadeIn" onClick={onClose}>
      <div 
        className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col animate-slideUp"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-4 border-b border-dark-200 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-dark-900">{conversation.title}</h3>
          <button onClick={onClose} className="text-dark-500 hover:text-dark-700 p-1.5 rounded-full hover:bg-dark-100">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-4 border-b border-dark-200 bg-dark-50 text-dark-600">
          <p>{conversation.description}</p>
        </div>
        
        <div className="overflow-y-auto flex-grow p-4 scrollbar-thin">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-56 text-dark-500">
              <Play className="h-12 w-12 mb-4 text-primary-500" />
              <p className="mb-2">Click the Play button below to see this capability in action</p>
              <p className="text-sm">A simulated conversation will demonstrate how Nolij processes and analyzes information</p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message, index) => (
                <ChatMessage key={index} message={message} />
              ))}
            </div>
          )}
        </div>
        
        <div className="p-4 border-t border-dark-200 flex justify-between items-center bg-dark-50">
          <div>
            {autoPlayComplete ? (
              <button 
                onClick={() => handleAutoPlay()}
                className="flex items-center py-2 px-4 bg-dark-100 rounded-md text-dark-700 hover:bg-dark-200 transition-colors"
              >
                <Play className="h-4 w-4 mr-2" />
                Replay Demo
              </button>
            ) : (
              <button 
                onClick={() => handleAutoPlay()}
                className={`flex items-center py-2 px-4 rounded-md transition-colors ${
                  isPlaying 
                    ? 'bg-dark-200 text-dark-500 cursor-not-allowed' 
                    : 'bg-primary-600 text-white hover:bg-primary-700'
                }`}
                disabled={isPlaying}
              >
                {isPlaying ? (
                  <>
                    <div className="h-4 w-4 mr-2 border-2 border-t-transparent rounded-full animate-spin" />
                    Playing...
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Play Demo
                  </>
                )}
              </button>
            )}
          </div>
          
          <button 
            onClick={() => onTryInChat(demoId)}
            className="flex items-center py-2 px-4 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            Try in Chat
          </button>
        </div>
      </div>
    </div>
  );
};

export default DemoModal;