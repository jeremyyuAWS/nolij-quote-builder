import React from 'react';
import { ArrowRight, Trash2, Clock } from 'lucide-react';
import { useChatContext } from '../../contexts/ChatContext';

interface ConversationHistoryProps {
  onClose: () => void;
}

const ConversationHistory: React.FC<ConversationHistoryProps> = ({ onClose }) => {
  const { 
    savedConversations, 
    loadConversation, 
    deleteConversation,
    currentConversationId
  } = useChatContext();

  // Sort conversations by timestamp, newest first
  const sortedConversations = [...savedConversations].sort((a, b) => b.timestamp - a.timestamp);

  const handleLoadConversation = (conversationId: string) => {
    loadConversation(conversationId);
    onClose();
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    
    // If today
    if (date.toDateString() === now.toDateString()) {
      return 'Today, ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } 
    // If yesterday
    else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday, ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } 
    // Otherwise show the date
    else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' }) + ', ' + 
             date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
  };
  
  return (
    <div className="flex-grow overflow-y-auto max-h-[400px] scrollbar-thin">
      <div className="p-4 border-b border-dark-200 flex items-center justify-between">
        <h3 className="font-medium text-dark-900 flex items-center">
          <Clock className="h-4 w-4 mr-1.5" />
          Conversation History
        </h3>
        <button
          onClick={onClose}
          className="text-dark-500 hover:text-dark-700 p-1"
        >
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
      
      {sortedConversations.length === 0 ? (
        <div className="p-8 text-center text-dark-500">
          <p>No saved conversations yet.</p>
          <p className="text-sm mt-2">When you save conversations, they'll appear here.</p>
        </div>
      ) : (
        <ul className="divide-y divide-dark-200">
          {sortedConversations.map((conversation) => (
            <li 
              key={conversation.id}
              className={`hover:bg-dark-50 transition-colors ${
                conversation.id === currentConversationId ? 'bg-primary-50' : ''
              }`}
            >
              <div className="p-4 flex justify-between">
                <div 
                  className="flex-grow cursor-pointer"
                  onClick={() => handleLoadConversation(conversation.id)}
                >
                  <h4 className="font-medium text-dark-800 mb-1">{conversation.title}</h4>
                  <p className="text-dark-500 text-sm truncate">{conversation.lastMessage}</p>
                  <div className="flex items-center mt-1 text-xs text-dark-400">
                    <span>{formatDate(conversation.timestamp)}</span>
                    <span className="mx-1">•</span>
                    <span>{conversation.messageCount} messages</span>
                  </div>
                </div>
                <button
                  onClick={() => deleteConversation(conversation.id)}
                  className="self-start p-1.5 text-dark-400 hover:text-red-500 rounded-full hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ConversationHistory;