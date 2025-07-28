import React from 'react';
import { MessageSquare, X } from 'lucide-react';

interface ChatButtonProps {
  onClick: () => void;
  isOpen: boolean;
  hasUnreadMessages: boolean;
}

const ChatButton: React.FC<ChatButtonProps> = ({ 
  onClick, 
  isOpen, 
  hasUnreadMessages 
}) => {
  return (
    <button
      onClick={onClick}
      className={`relative mt-4 flex items-center justify-center p-3 rounded-full shadow-lg transition-all duration-300 ${
        isOpen
          ? 'bg-dark-800 hover:bg-dark-700 text-white'
          : 'bg-primary-600 hover:bg-primary-700 text-white'
      }`}
      aria-label={isOpen ? 'Close chat' : 'Open chat'}
    >
      {isOpen ? (
        <X className="h-6 w-6" />
      ) : (
        <>
          <MessageSquare className="h-6 w-6" />
          {hasUnreadMessages && (
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-secondary-500 rounded-full" />
          )}
        </>
      )}
    </button>
  );
};

export default ChatButton;