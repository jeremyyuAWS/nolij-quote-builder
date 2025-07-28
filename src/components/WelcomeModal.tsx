import React, { useState } from 'react';
import { X, FileText, Settings, ArrowLeftRight, MessageSquare, Database, Brain } from 'lucide-react';
import { useWelcomeModal } from '../contexts/WelcomeModalContext';

const WelcomeModal: React.FC = () => {
  const { showModal, setShowModal, hideModalPermanently } = useWelcomeModal();
  const [dontShowAgain, setDontShowAgain] = useState(false);

  if (!showModal) return null;

  const handleClose = () => {
    if (dontShowAgain) {
      hideModalPermanently();
    } else {
      setShowModal(false);
    }
  };

  const features = [
    {
      icon: <FileText className="h-6 w-6 text-primary-600" />,
      title: "Intelligent Document Extraction",
      description: "Automatically extract and validate technical specifications from complex documentation, reducing manual review time by up to 80%."
    },
    {
      icon: <Settings className="h-6 w-6 text-primary-600" />,
      title: "Configuration Analysis",
      description: "Detect misconfigurations, compatibility issues, and missing components before deployment, preventing costly implementation errors."
    },
    {
      icon: <ArrowLeftRight className="h-6 w-6 text-primary-600" />,
      title: "Smart Product Alternatives",
      description: "Instantly identify suitable replacements for discontinued or out-of-stock products, maintaining project timelines."
    },
    {
      icon: <Brain className="h-6 w-6 text-primary-600" />,
      title: "AI-Powered Knowledge Graph",
      description: "Access a comprehensive technical knowledge base that understands complex relationships between products, specifications, and requirements."
    },
    {
      icon: <MessageSquare className="h-6 w-6 text-primary-600" />,
      title: "Interactive Assistant",
      description: "Get real-time guidance and answers about technical specifications, compatibility, and quote building through natural language conversation."
    },
    {
      icon: <Database className="h-6 w-6 text-primary-600" />,
      title: "Data-Driven Insights",
      description: "Leverage historical data to optimize quotes, predict potential issues, and increase quote accuracy by up to 40%."
    }
  ];

  const businessValues = [
    "Reduce quote preparation time by 60%",
    "Minimize technical errors by up to 75%",
    "Improve customer satisfaction through faster response times",
    "Decrease project delays caused by specification misalignment",
    "Ensure accurate component identification and compatibility",
    "Streamline the entire quoting process from document analysis to final proposal"
  ];

  return (
    <div className="fixed inset-0 bg-dark-900/40 z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col animate-slideUp overflow-hidden">
        <div className="p-4 border-b border-dark-200 flex justify-between items-center bg-primary-50">
          <div className="flex items-center">
            <Database className="h-7 w-7 text-primary-600 mr-3" />
            <h2 className="text-2xl font-bold text-dark-900">Welcome to Nolij.ai <span className="text-primary-600">QuoteBuilder</span></h2>
          </div>
          <button 
            onClick={handleClose} 
            className="text-dark-500 hover:text-dark-700 p-1.5 rounded-full hover:bg-dark-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="flex-grow overflow-y-auto p-6">
          <p className="text-lg text-dark-600 mb-6">
            Nolij.ai QuoteBuilder leverages advanced AI to streamline technical document processing, 
            validation, and quote generation for complex technical products and services.
          </p>
          
          <h3 className="text-xl font-semibold text-dark-800 mb-4">Key Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start border border-dark-100 rounded-lg p-4 hover:border-primary-300 hover:bg-primary-50 transition-colors">
                <div className="mr-3 mt-1">{feature.icon}</div>
                <div>
                  <h4 className="font-medium text-dark-800 mb-1">{feature.title}</h4>
                  <p className="text-dark-600 text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <h3 className="text-xl font-semibold text-dark-800 mb-4">Business Value</h3>
          <div className="bg-dark-50 rounded-lg p-5 border border-dark-100 mb-6">
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {businessValues.map((value, index) => (
                <li key={index} className="flex items-center">
                  <div className="h-2 w-2 bg-primary-500 rounded-full mr-2"></div>
                  <span className="text-dark-700">{value}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-primary-50 rounded-lg p-5 border border-primary-100">
            <h3 className="text-lg font-medium text-dark-800 mb-2">Getting Started</h3>
            <p className="text-dark-600 mb-4">
              Try out the capabilities using the feature tags below the header or interact directly with the AI assistant 
              using the chat button in the bottom right corner.
            </p>
            <p className="text-dark-600">
              You can access this guide anytime by clicking the help (?) button in the top right corner of the application.
            </p>
          </div>
        </div>
        
        <div className="p-4 border-t border-dark-200 bg-dark-50 flex items-center justify-between">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="dont-show-again"
              checked={dontShowAgain}
              onChange={() => setDontShowAgain(!dontShowAgain)}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-dark-300 rounded"
            />
            <label htmlFor="dont-show-again" className="ml-2 text-dark-600 text-sm">
              Don't show this screen on startup
            </label>
          </div>
          <button
            onClick={handleClose}
            className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeModal;