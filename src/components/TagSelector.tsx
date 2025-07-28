import React, { useState } from 'react';
import { useChatContext } from '../contexts/ChatContext';
import { tagData } from '../data/tags';
import DemoModal from './DemoModal';

const TagSelector: React.FC = () => {
  const [activeDemo, setActiveDemo] = useState<string | null>(null);
  const { triggerConversation } = useChatContext();

  const handleTagClick = (tagId: string) => {
    setActiveDemo(tagId);
  };

  const handleDemoClose = () => {
    setActiveDemo(null);
  };

  const handleTryInChat = (tagId: string) => {
    triggerConversation(tagId);
    setActiveDemo(null);
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-dark-800 mb-4">
        Try these capabilities:
      </h2>
      <div className="flex flex-wrap gap-2 md:gap-3">
        {tagData.map((tag) => (
          <button
            key={tag.id}
            onClick={() => handleTagClick(tag.id)}
            className="group relative flex items-center py-2 px-4 bg-white border border-dark-200 rounded-full text-dark-800 hover:border-primary-400 hover:shadow-sm transition-all duration-200"
          >
            {tag.icon && <span className="mr-2 text-primary-600">{tag.icon}</span>}
            <span>{tag.label}</span>
            <div className="absolute inset-x-0 bottom-0 h-0.5 bg-primary-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left rounded-full"></div>
          </button>
        ))}
      </div>

      {activeDemo && (
        <DemoModal 
          demoId={activeDemo} 
          onClose={handleDemoClose} 
          onTryInChat={handleTryInChat} 
        />
      )}
    </div>
  );
};

export default TagSelector;