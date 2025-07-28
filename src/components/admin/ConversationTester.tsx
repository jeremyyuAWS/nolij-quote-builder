import React, { useState } from 'react';
import { conversations } from '../../data/conversations';
import { Play, Check, Save, List, File, UploadCloud } from 'lucide-react';

const ConversationTester: React.FC = () => {
  const [selectedConversation, setSelectedConversation] = useState('');
  const [lastPlayed, setLastPlayed] = useState<string | null>(null);
  const [customConversation, setCustomConversation] = useState('');
  const [savedScenarios, setSavedScenarios] = useState<{id: string, name: string, content: string}[]>([
    { id: 'test1', name: 'Complex Configuration Test', content: 'User: I need to configure a network with 45 cameras and 30 phones.\nAssistant: Based on your requirements...' },
    { id: 'test2', name: 'EOL Product Inquiry', content: 'User: Is the ENT-8000-PRO still available?\nAssistant: The ENT-8000-PRO has reached its end-of-life...' }
  ]);
  const [selectedTab, setSelectedTab] = useState('preset');
  const [showFileUpload, setShowFileUpload] = useState(false);
  
  const handlePlay = (id: string) => {
    // In a real app, this would trigger the conversation
    setLastPlayed(id);
  };

  const handleSaveCustom = () => {
    if (customConversation.trim()) {
      const newId = `custom${Date.now()}`;
      const firstLine = customConversation.split('\n')[0].slice(0, 30) + '...';
      setSavedScenarios(prev => [...prev, {
        id: newId,
        name: `Custom: ${firstLine}`,
        content: customConversation
      }]);
      setCustomConversation('');
    }
  };

  const handleLoadScenario = (id: string) => {
    const scenario = savedScenarios.find(s => s.id === id);
    if (scenario) {
      setCustomConversation(scenario.content);
      setSelectedTab('custom');
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setSelectedTab('preset')}
            className={`px-4 py-3 text-sm font-medium ${
              selectedTab === 'preset'
                ? 'text-primary-600 border-b-2 border-primary-600 bg-primary-50'
                : 'text-dark-600 hover:text-primary-600 hover:bg-dark-50'
            }`}
          >
            <Play className="h-4 w-4 inline-block mr-2" />
            Preset Conversations
          </button>
          <button
            onClick={() => setSelectedTab('custom')}
            className={`px-4 py-3 text-sm font-medium ${
              selectedTab === 'custom'
                ? 'text-primary-600 border-b-2 border-primary-600 bg-primary-50'
                : 'text-dark-600 hover:text-primary-600 hover:bg-dark-50'
            }`}
          >
            <File className="h-4 w-4 inline-block mr-2" />
            Custom Test
          </button>
          <button
            onClick={() => setSelectedTab('saved')}
            className={`px-4 py-3 text-sm font-medium ${
              selectedTab === 'saved'
                ? 'text-primary-600 border-b-2 border-primary-600 bg-primary-50'
                : 'text-dark-600 hover:text-primary-600 hover:bg-dark-50'
            }`}
          >
            <List className="h-4 w-4 inline-block mr-2" />
            Saved Scenarios
          </button>
        </div>
        
        {selectedTab === 'preset' && (
          <div className="divide-y divide-gray-200">
            {Object.entries(conversations).map(([id, conversation]) => (
              <div 
                key={id} 
                className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div>
                  <h3 className="font-medium text-gray-800">{conversation.title}</h3>
                  <p className="text-sm text-gray-500">{conversation.description}</p>
                </div>
                <button
                  onClick={() => handlePlay(id)}
                  className={`p-2 rounded-full ${
                    lastPlayed === id 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                  }`}
                >
                  {lastPlayed === id ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <Play className="h-5 w-5" />
                  )}
                </button>
              </div>
            ))}
          </div>
        )}
        
        {selectedTab === 'custom' && (
          <div className="p-4">
            <div className="mb-2 flex justify-between items-center">
              <label className="block text-sm font-medium text-gray-700">
                Custom Conversation Scenario
              </label>
              <div className="flex space-x-2">
                <button
                  onClick={() => setShowFileUpload(!showFileUpload)}
                  className="text-primary-600 text-sm hover:text-primary-700 flex items-center"
                >
                  <UploadCloud className="h-4 w-4 mr-1" />
                  Import
                </button>
                <button
                  onClick={handleSaveCustom}
                  disabled={!customConversation.trim()}
                  className={`text-primary-600 text-sm hover:text-primary-700 flex items-center ${
                    !customConversation.trim() ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <Save className="h-4 w-4 mr-1" />
                  Save
                </button>
              </div>
            </div>
            
            {showFileUpload && (
              <div className="mb-4 p-3 border border-dashed border-gray-300 rounded-md bg-gray-50">
                <div className="text-center">
                  <UploadCloud className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600 mb-2">
                    Upload a text file with conversation format
                  </p>
                  <input
                    type="file"
                    accept=".txt"
                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
                  />
                </div>
              </div>
            )}
            
            <textarea
              className="w-full h-64 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
              placeholder="Enter a custom conversation to test in the format:

User: Can you analyze this network configuration?
Assistant: I'll help you analyze that configuration...
User: Are there any compatibility issues?
Assistant: Based on my analysis..."
              value={customConversation}
              onChange={(e) => setCustomConversation(e.target.value)}
            />
            
            <div className="mt-3 flex justify-end">
              <button 
                className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors flex items-center"
                disabled={!customConversation.trim()}
              >
                <Play className="h-4 w-4 mr-2" />
                Run Test
              </button>
            </div>
          </div>
        )}
        
        {selectedTab === 'saved' && (
          <div>
            {savedScenarios.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <p>No saved scenarios yet.</p>
                <p className="text-sm mt-2">Create custom test scenarios and save them for reuse.</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {savedScenarios.map((scenario) => (
                  <div key={scenario.id} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start">
                      <div className="flex-grow">
                        <h3 className="font-medium text-gray-800">{scenario.name}</h3>
                        <p className="text-sm text-gray-500 mt-1 line-clamp-2 font-mono">
                          {scenario.content.slice(0, 100)}...
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleLoadScenario(scenario.id)}
                          className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200"
                        >
                          <File className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handlePlay(scenario.id)}
                          className="p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200"
                        >
                          <Play className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversationTester;