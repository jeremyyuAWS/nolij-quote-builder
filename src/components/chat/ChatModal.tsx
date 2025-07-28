import React, { useState, useRef, useEffect } from 'react';
import { Send, RefreshCw, Save, PlusCircle, FolderOpen, X, Clock } from 'lucide-react';
import ChatMessage from './ChatMessage';
import { useChatContext } from '../../contexts/ChatContext';
import { usePersona } from '../../contexts/PersonaContext';
import ConversationHistory from './ConversationHistory';

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatModal: React.FC<ChatModalProps> = ({ isOpen, onClose }) => {
  const [message, setMessage] = useState('');
  const [showAttachPanel, setShowAttachPanel] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [savingConversation, setSavingConversation] = useState(false);
  const [conversationTitle, setConversationTitle] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { 
    messages, 
    sendMessage, 
    sendFileAttachments,
    resetConversation, 
    isTyping,
    currentConversationId,
    savedConversations,
    saveCurrentConversation
  } = useChatContext();
  
  const { activePersona } = usePersona();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() !== '') {
      sendMessage(message);
      setMessage('');
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      sendFileAttachments(Array.from(e.target.files));
      setShowAttachPanel(false);
      
      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };
  
  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      sendFileAttachments(Array.from(e.dataTransfer.files));
    }
  };
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };
  
  const handleSaveConversation = () => {
    if (savingConversation) {
      saveCurrentConversation(conversationTitle || undefined);
      setSavingConversation(false);
      setConversationTitle('');
    } else {
      setSavingConversation(true);
      setConversationTitle('');
    }
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  if (!isOpen) return null;

  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow-xl border border-dark-200 flex flex-col transition-all duration-300 animate-slideUp">
      <div className="p-4 border-b border-dark-200 flex justify-between items-center bg-dark-50 rounded-t-lg">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center text-white">
            {activePersona === 'professional' ? 'N' : 'N'}
          </div>
          <div className="ml-2">
            <h3 className="font-medium text-dark-900">
              {activePersona === 'professional' ? 'Nolij QuoteBuilder' : 'Nolij Assistant'}
            </h3>
            <p className="text-xs text-dark-500">
              {isTyping ? 'Typing...' : 'Online'}
            </p>
          </div>
        </div>
        <div className="flex space-x-1">
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="p-1.5 text-dark-500 hover:text-dark-700 rounded-full hover:bg-dark-100 transition-colors"
            title="Conversation history"
          >
            <Clock className="h-4 w-4" />
          </button>
          <button
            onClick={handleSaveConversation}
            className="p-1.5 text-dark-500 hover:text-dark-700 rounded-full hover:bg-dark-100 transition-colors"
            title="Save conversation"
          >
            <Save className="h-4 w-4" />
          </button>
          <button
            onClick={resetConversation}
            className="p-1.5 text-dark-500 hover:text-dark-700 rounded-full hover:bg-dark-100 transition-colors"
            title="Reset conversation"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      {showHistory ? (
        <ConversationHistory onClose={() => setShowHistory(false)} />
      ) : (
        <>
          <div 
            className="flex-grow p-4 overflow-y-auto max-h-[400px] scrollbar-thin"
            onDrop={handleFileDrop}
            onDragOver={handleDragOver}
          >
            {messages.length === 0 ? (
              <div className="text-center text-dark-500 my-8">
                <p>Ask me about building and validating quotes,</p>
                <p>or drag and drop files to analyze.</p>
              </div>
            ) : (
              messages.map((msg, index) => (
                <ChatMessage key={index} message={msg} />
              ))
            )}
            {isTyping && (
              <ChatMessage 
                message={{ 
                  sender: 'agent', 
                  text: '...', 
                  isTyping: true,
                  persona: activePersona
                }} 
              />
            )}
            <div ref={messagesEndRef} />
          </div>
          
          {savingConversation && (
            <div className="p-3 border-t border-dark-200 bg-primary-50 flex items-center">
              <input
                type="text"
                value={conversationTitle}
                onChange={(e) => setConversationTitle(e.target.value)}
                placeholder="Enter conversation title..."
                className="flex-grow bg-white border border-dark-300 rounded px-3 py-1 text-sm"
                autoFocus
              />
              <button
                onClick={handleSaveConversation}
                className="ml-2 p-1.5 bg-primary-600 text-white rounded"
              >
                <Save className="h-4 w-4" />
              </button>
              <button
                onClick={() => setSavingConversation(false)}
                className="ml-1 p-1.5 bg-dark-300 text-white rounded"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}
          
          {showAttachPanel && (
            <div className="p-3 border-t border-dark-200 bg-dark-50">
              <div className="flex justify-between items-center mb-2">
                <div className="text-sm font-medium text-dark-800">Attach files</div>
                <button 
                  onClick={() => setShowAttachPanel(false)}
                  className="text-dark-500 hover:text-dark-700"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="border-2 border-dashed border-dark-300 rounded-md p-4 text-center">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  multiple
                  className="hidden"
                  id="file-upload"
                />
                <label 
                  htmlFor="file-upload"
                  className="cursor-pointer text-dark-600 hover:text-primary-600 block"
                >
                  <FolderOpen className="h-8 w-8 mx-auto mb-2 text-dark-400" />
                  <span className="text-sm">Click to browse or drag files here</span>
                </label>
              </div>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="p-3 border-t border-dark-200">
            <div className="flex items-center bg-dark-100 rounded-full pl-4 pr-1 py-1">
              <button
                type="button"
                onClick={() => setShowAttachPanel(!showAttachPanel)}
                className="text-dark-500 hover:text-primary-600 mr-2"
                title="Attach files"
              >
                <PlusCircle className="h-5 w-5" />
              </button>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-grow bg-transparent outline-none text-dark-800 placeholder-dark-500"
              />
              <button
                type="submit"
                disabled={message.trim() === ''}
                className={`ml-2 p-2 rounded-full ${
                  message.trim() === '' 
                    ? 'text-dark-400 bg-dark-200'
                    : 'text-white bg-primary-600 hover:bg-primary-700'
                } transition-colors`}
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default ChatModal;