import React, { useState } from 'react';
import DocumentExtraction from './DocumentExtraction';
import ConfigurationAnalysis from './ConfigurationAnalysis';
import ProductAlternatives from './ProductAlternatives';
import ProductRoadmap from './ProductRoadmap';
import { FileText, Settings, ArrowLeftRight, Calendar } from 'lucide-react';

type TabId = 'extraction' | 'analysis' | 'alternatives' | 'roadmap';

const FeatureTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('extraction');

  const tabs = [
    { id: 'extraction' as TabId, label: 'Document Extraction', icon: <FileText className="h-4 w-4" /> },
    { id: 'analysis' as TabId, label: 'Configuration Analysis', icon: <Settings className="h-4 w-4" /> },
    { id: 'alternatives' as TabId, label: 'Product Alternatives', icon: <ArrowLeftRight className="h-4 w-4" /> },
    { id: 'roadmap' as TabId, label: 'Product Roadmap', icon: <Calendar className="h-4 w-4" /> },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md border border-dark-200 overflow-hidden">
      <div className="flex overflow-x-auto no-scrollbar border-b border-dark-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === tab.id
                ? 'text-primary-600 border-b-2 border-primary-600 bg-primary-50'
                : 'text-dark-600 hover:text-primary-600 hover:bg-dark-50'
            }`}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>
      
      <div className="p-6">
        {activeTab === 'extraction' && <DocumentExtraction />}
        {activeTab === 'analysis' && <ConfigurationAnalysis />}
        {activeTab === 'alternatives' && <ProductAlternatives />}
        {activeTab === 'roadmap' && <ProductRoadmap />}
      </div>
    </div>
  );
};

export default FeatureTabs;