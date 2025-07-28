import React, { useState } from 'react';
import { CopyIcon, CheckIcon } from 'lucide-react';

const AgentDebugger: React.FC = () => {
  const [copied, setCopied] = useState(false);
  
  const sampleAgentInput = {
    messages: [
      {
        role: "user",
        content: "I need to validate a switch configuration with model SW-24-POE."
      }
    ],
    temperature: 0.7,
    model: "gpt-4-1106-preview",
    systemPrompt: "You are a network hardware configuration validator...",
  };
  
  const sampleAgentOutput = {
    response: "I'll help you validate the SW-24-POE switch configuration...",
    compatibility: {
      portCount: 24,
      poeSupport: true,
      poeWattage: 370,
      requiredLicense: "NET-ADV-1YR",
      missingComponents: ["POE-CORD-NA"],
    },
    compatibility_score: 0.85,
    confidence: 0.92,
    reasoning: "The configuration is missing the required power cord...",
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="font-medium text-gray-800">Agent Request</h2>
          <button
            onClick={() => handleCopy(JSON.stringify(sampleAgentInput, null, 2))}
            className="text-gray-500 hover:text-gray-700"
          >
            {copied ? <CheckIcon className="h-4 w-4" /> : <CopyIcon className="h-4 w-4" />}
          </button>
        </div>
        <pre className="p-4 overflow-auto bg-gray-50 rounded-b-lg text-sm text-gray-800 max-h-64">
          {JSON.stringify(sampleAgentInput, null, 2)}
        </pre>
      </div>
      
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="font-medium text-gray-800">Agent Response</h2>
          <button
            onClick={() => handleCopy(JSON.stringify(sampleAgentOutput, null, 2))}
            className="text-gray-500 hover:text-gray-700"
          >
            {copied ? <CheckIcon className="h-4 w-4" /> : <CopyIcon className="h-4 w-4" />}
          </button>
        </div>
        <pre className="p-4 overflow-auto bg-gray-50 rounded-b-lg text-sm text-gray-800 max-h-64">
          {JSON.stringify(sampleAgentOutput, null, 2)}
        </pre>
      </div>
      
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-4 border-b border-gray-200">
          <h2 className="font-medium text-gray-800">Agent Settings</h2>
        </div>
        <div className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Temperature
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              defaultValue="0.7"
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Precise (0.0)</span>
              <span>Balanced (0.7)</span>
              <span>Creative (1.0)</span>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Agent Model
            </label>
            <select className="w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
              <option value="gpt-4">GPT-4 (Default)</option>
              <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
              <option value="claude-2">Claude 2</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentDebugger;