import React, { useState } from 'react';
import { X, Copy, Check, Share2, Globe, Lock, Send } from 'lucide-react';

interface ShareableQuoteModalProps {
  onClose: () => void;
}

const ShareableQuoteModal: React.FC<ShareableQuoteModalProps> = ({ onClose }) => {
  const [copied, setCopied] = useState(false);
  const [quoteLink, setQuoteLink] = useState('https://nolij.ai/quote/q8c3p7z5');
  const [isPublic, setIsPublic] = useState(true);
  const [email, setEmail] = useState('');
  const [recipients, setRecipients] = useState<string[]>([]);
  const [emailSent, setEmailSent] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(quoteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const addRecipient = () => {
    if (email && !recipients.includes(email)) {
      setRecipients([...recipients, email]);
      setEmail('');
    }
  };
  
  const removeRecipient = (emailToRemove: string) => {
    setRecipients(recipients.filter(e => e !== emailToRemove));
  };
  
  const handleSendEmail = () => {
    // Simulate sending email
    setEmailSent(true);
    setTimeout(() => setEmailSent(false), 2000);
  };
  
  const generateNewLink = () => {
    // Generate a new random link
    const randomId = Math.random().toString(36).substring(2, 10);
    setQuoteLink(`https://nolij.ai/quote/${randomId}`);
  };
  
  return (
    <div className="fixed inset-0 bg-dark-900/40 z-50 flex items-center justify-center p-4 animate-fadeIn" onClick={onClose}>
      <div 
        className="bg-white rounded-lg shadow-xl w-full max-w-lg animate-slideUp"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-4 border-b border-dark-200 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-dark-900 flex items-center">
            <Share2 className="h-5 w-5 mr-2 text-primary-600" />
            Shareable Quote Link
          </h3>
          <button onClick={onClose} className="text-dark-500 hover:text-dark-700 p-1.5 rounded-full hover:bg-dark-100">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="mb-6">
            <label className="block text-sm font-medium text-dark-700 mb-2">
              Shareable Quote Link
            </label>
            <div className="flex">
              <input
                type="text"
                value={quoteLink}
                readOnly
                className="flex-grow px-3 py-2 border border-dark-300 rounded-l-md bg-dark-50 text-dark-800"
              />
              <button
                onClick={handleCopy}
                className="px-3 py-2 bg-primary-600 text-white rounded-r-md hover:bg-primary-700 transition-colors flex items-center"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-dark-700 mb-2">
              Link Settings
            </label>
            <div className="flex space-x-3">
              <button
                onClick={() => setIsPublic(true)}
                className={`flex-1 p-3 rounded-md border ${
                  isPublic 
                    ? 'border-primary-600 bg-primary-50 text-primary-800' 
                    : 'border-dark-300 hover:border-primary-400 hover:bg-primary-50'
                } transition-colors flex items-center justify-center`}
              >
                <Globe className="h-5 w-5 mr-2" />
                Public Link
              </button>
              <button
                onClick={() => setIsPublic(false)}
                className={`flex-1 p-3 rounded-md border ${
                  !isPublic 
                    ? 'border-primary-600 bg-primary-50 text-primary-800' 
                    : 'border-dark-300 hover:border-primary-400 hover:bg-primary-50'
                } transition-colors flex items-center justify-center`}
              >
                <Lock className="h-5 w-5 mr-2" />
                Private Link
              </button>
            </div>
            <p className="mt-2 text-sm text-dark-500">
              {isPublic 
                ? 'Anyone with the link can view this quote' 
                : 'Only authorized recipients can view this quote'}
            </p>
          </div>
          
          <div className="mb-6">
            <button
              onClick={generateNewLink}
              className="px-4 py-2 bg-dark-100 text-dark-700 rounded-md hover:bg-dark-200 transition-colors"
            >
              Generate New Link
            </button>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-dark-700 mb-2">
              Email Quote Link
            </label>
            <div className="flex mb-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email address"
                className="flex-grow px-3 py-2 border border-dark-300 rounded-l-md"
              />
              <button
                onClick={addRecipient}
                disabled={!email}
                className={`px-3 py-2 rounded-r-md ${
                  !email 
                    ? 'bg-dark-200 text-dark-500 cursor-not-allowed' 
                    : 'bg-primary-600 text-white hover:bg-primary-700'
                } transition-colors`}
              >
                Add
              </button>
            </div>
            
            {recipients.length > 0 && (
              <div className="mb-3">
                <div className="text-sm text-dark-700 mb-1">Recipients:</div>
                <div className="flex flex-wrap gap-2">
                  {recipients.map((recipient) => (
                    <div 
                      key={recipient}
                      className="flex items-center bg-primary-100 text-primary-800 px-2 py-1 rounded text-sm"
                    >
                      {recipient}
                      <button
                        onClick={() => removeRecipient(recipient)}
                        className="ml-1 text-primary-600 hover:text-primary-800"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <button
              onClick={handleSendEmail}
              disabled={recipients.length === 0}
              className={`px-4 py-2 rounded-md ${
                recipients.length === 0 
                  ? 'bg-dark-200 text-dark-500 cursor-not-allowed' 
                  : 'bg-primary-600 text-white hover:bg-primary-700'
              } transition-colors flex items-center justify-center w-full`}
            >
              {emailSent ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Sent Successfully
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Send Quote Link
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareableQuoteModal;