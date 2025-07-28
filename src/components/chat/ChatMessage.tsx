import React, { useState, useEffect } from 'react';
import { ThumbsUp, ThumbsDown, FileText, Image, X, Check, AlertCircle, Download } from 'lucide-react';
import { Message, FileAttachment } from '../../types';
import Visualization from '../visualizations/Visualization';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isFullyTyped, setIsFullyTyped] = useState(false);
  const [feedback, setFeedback] = useState<'up' | 'down' | null>(null);
  
  // Format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    else if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    else return (bytes / (1024 * 1024 * 1024)).toFixed(1) + ' GB';
  };
  
  // Get icon for file type
  const getFileIcon = (fileType: string) => {
    if (fileType.includes('image')) {
      return <Image className="h-4 w-4" />;
    } else {
      return <FileText className="h-4 w-4" />;
    }
  };
  
  // Typing animation effect for agent messages
  useEffect(() => {
    if (message.sender === 'agent' && !message.isTyping) {
      let i = 0;
      const text = message.text;
      setDisplayedText('');
      
      const typingInterval = setInterval(() => {
        if (i < text.length) {
          setDisplayedText(prev => prev + text.charAt(i));
          i++;
        } else {
          clearInterval(typingInterval);
          setIsFullyTyped(true);
        }
      }, 15); // Typing speed
      
      return () => clearInterval(typingInterval);
    } else {
      setDisplayedText(message.text);
      setIsFullyTyped(true);
    }
  }, [message]);

  if (message.isTyping) {
    return (
      <div className="flex items-start mb-4">
        <div className="mr-2 bg-dark-100 rounded-lg p-3 max-w-[80%]">
          <div className="flex space-x-1">
            <div className="h-2 w-2 bg-dark-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="h-2 w-2 bg-dark-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="h-2 w-2 bg-dark-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-start mb-4 ${
      message.sender === 'user' ? 'justify-end' : 'justify-start'
    }`}>
      <div
        className={`${
          message.sender === 'user' 
            ? 'bg-primary-600 text-white rounded-l-lg rounded-br-lg' 
            : 'bg-dark-100 text-dark-800 rounded-r-lg rounded-bl-lg'
        } p-3 max-w-[80%]`}
      >
        {/* Time stamp - small and subtle */}
        {message.timestamp && (
          <div className={`text-xs mb-1 ${
            message.sender === 'user' ? 'text-primary-200' : 'text-dark-400'
          }`}>
            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        )}
        
        {/* Message text */}
        <p className={`whitespace-pre-wrap ${
          message.persona === 'conversational' ? 'text-md' : ''
        }`}>
          {message.sender === 'agent' ? displayedText : message.text}
        </p>
        
        {/* File attachments */}
        {message.attachments && message.attachments.length > 0 && (
          <div className="mt-2 space-y-2">
            {message.attachments.map((file) => (
              <div 
                key={file.id}
                className={`flex items-center p-2 rounded ${
                  message.sender === 'user' 
                    ? 'bg-primary-700 text-white' 
                    : 'bg-white border border-dark-200 text-dark-800'
                }`}
              >
                <div className="mr-2 flex-shrink-0">
                  {getFileIcon(file.type)}
                </div>
                <div className="flex-grow min-w-0">
                  <div className="truncate text-sm font-medium">{file.name}</div>
                  <div className="text-xs">
                    {formatFileSize(file.size)}
                  </div>
                  
                  {/* Progress bar for uploading files */}
                  {file.status === 'uploading' && (
                    <div className="mt-1">
                      <div className="w-full h-1 bg-dark-400 rounded-full overflow-hidden">
                        <div 
                          className="h-1 bg-white rounded-full" 
                          style={{ width: `${file.progress || 0}%` }}
                        />
                      </div>
                      <div className="text-xs mt-0.5">
                        {file.progress}% uploaded
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Status indicator */}
                <div className="ml-2 flex-shrink-0">
                  {file.status === 'complete' ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : file.status === 'error' ? (
                    <AlertCircle className="h-4 w-4 text-red-500" />
                  ) : file.status === 'processing' ? (
                    <div className="h-4 w-4 border-2 border-t-transparent rounded-full animate-spin" />
                  ) : null}
                </div>
                
                {/* Download button for complete files */}
                {file.status === 'complete' && file.url && (
                  <a 
                    href={file.url}
                    download={file.name}
                    className={`ml-2 p-1 rounded-full ${
                      message.sender === 'user' 
                        ? 'text-white hover:bg-primary-800' 
                        : 'text-dark-500 hover:bg-dark-100'
                    }`}
                  >
                    <Download className="h-4 w-4" />
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
        
        {/* Visualization for agent messages */}
        {message.sender === 'agent' && message.visualization && isFullyTyped && (
          <div className="mt-3 bg-white rounded p-2 border border-dark-200">
            <Visualization 
              type={message.visualization.type} 
              data={message.visualization.data} 
            />
          </div>
        )}
        
        {/* Feedback buttons for agent messages */}
        {message.sender === 'agent' && isFullyTyped && (
          <div className="mt-2 flex items-center justify-end">
            <div className="flex space-x-2">
              <button 
                onClick={() => setFeedback('up')}
                className={`p-1 rounded-full ${
                  feedback === 'up' 
                    ? 'bg-green-100 text-green-600' 
                    : 'text-dark-400 hover:text-dark-600'
                }`}
              >
                <ThumbsUp className="h-3 w-3" />
              </button>
              <button 
                onClick={() => setFeedback('down')}
                className={`p-1 rounded-full ${
                  feedback === 'down' 
                    ? 'bg-red-100 text-red-600' 
                    : 'text-dark-400 hover:text-dark-600'
                }`}
              >
                <ThumbsDown className="h-3 w-3" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;