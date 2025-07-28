import React, { useState, useEffect } from 'react';
import ChatModal from './ChatModal';
import ChatButton from './ChatButton';
import { ChatProvider } from '../../contexts/ChatContext';

const ChatContainer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnreadMessages, setHasUnreadMessages] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setHasUnreadMessages(false);
    }
  };

  const handleNewMessage = () => {
    if (!isOpen) {
      setHasUnreadMessages(true);
    }
  };

  return (
    <ChatProvider onNewMessage={handleNewMessage}>
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        <ChatModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
        <ChatButton 
          onClick={toggleChat} 
          isOpen={isOpen} 
          hasUnreadMessages={hasUnreadMessages} 
        />
      </div>
    </ChatProvider>
  );
};

export default ChatContainer;