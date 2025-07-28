import React from 'react';
import { Calendar, Check, Star, Zap, BarChart3 } from 'lucide-react';

const ProductRoadmap: React.FC = () => {
  const currentQuarter = 'Q2 2025';
  
  const roadmapItems = [
    {
      id: 'advanced-extraction',
      title: 'Advanced Document Extraction',
      description: 'Enhanced capabilities to extract complex data from technical documents, diagrams, and legacy formats',
      timeline: 'Q3 2025',
      status: 'in-progress',
      completion: 65,
      features: [
        'Improved diagram and schematic understanding',
        'Multi-page context awareness',
        'Self-improving extraction accuracy',
        'Support for legacy technical drawing formats'
      ]
    },
    {
      id: 'multi-doc',
      title: 'Multi-Document Analysis',
      description: 'Cross-reference information across multiple documents to identify inconsistencies and dependencies',
      timeline: 'Q3 2025',
      status: 'in-progress',
      completion: 40,
      features: [
        'Cross-document information validation',
        'Automatic inconsistency detection',
        'Technical dependencies mapping',
        'Quote validation across document sets'
      ]
    },
    {
      id: 'industry',
      title: 'Industry Verticalization',
      description: 'Specialized extraction and validation models for healthcare, finance, and manufacturing',
      timeline: 'Q4 2025',
      status: 'planned',
      completion: 15,
      features: [
        'Healthcare-specific document models',
        'Financial services compliance validation',
        'Manufacturing BOM and supply chain analytics',
        'Industry-specific terminology support'
      ]
    },
    {
      id: 'visual',
      title: 'Visual Processing Enhancement',
      description: 'Expanded capabilities to understand and extract information from visual elements in documents',
      timeline: 'Q4 2025',
      status: 'planned',
      completion: 5,
      features: [
        'Technical diagram semantic understanding',
        'Image content extraction and analysis',
        'Visual-textual correlation',
        'Interactive visual components in responses'
      ]
    }
  ];
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'released':
        return <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full bg-green-100 text-green-800">
          <Check className="h-3 w-3 mr-1" />
          Released
        </span>;
      case 'in-progress':
        return <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full bg-primary-100 text-primary-800">
          <BarChart3 className="h-3 w-3 mr-1" />
          In Development
        </span>;
      case 'planned':
        return <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full bg-dark-100 text-dark-800">
          <Calendar className="h-3 w-3 mr-1" />
          Planned
        </span>;
      default:
        return null;
    }
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-dark-900 mb-2">Product Roadmap</h2>
        <p className="text-dark-600">
          Explore upcoming features and enhancements for Nolij's document intelligence platform 
          that will further improve quote validation and technical document processing.
        </p>
      </div>
      
      <div className="border rounded-lg overflow-hidden bg-gradient-to-br from-primary-50 to-dark-50 p-6">
        <div className="flex flex-col md:flex-row items-center justify-between mb-6">
          <div>
            <div className="flex items-center mb-2">
              <Star className="h-5 w-5 text-primary-500 mr-2" />
              <h3 className="text-xl font-semibold text-dark-900">Nolij.ai Roadmap</h3>
            </div>
            <p className="text-dark-600">
              Our vision for expanding document intelligence capabilities
            </p>
          </div>
          <div className="mt-4 md:mt-0 border border-dark-200 rounded-md px-3 py-1.5 bg-white">
            <div className="text-xs text-dark-500">Current Quarter</div>
            <div className="font-medium text-dark-800">{currentQuarter}</div>
          </div>
        </div>
        
        <div className="space-y-6">
          {roadmapItems.map(item => (
            <div key={item.id} className="border rounded-lg bg-white overflow-hidden">
              <div className="p-4 border-b border-dark-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <div>
                    <div className="flex items-center">
                      <h4 className="font-medium text-dark-900">{item.title}</h4>
                      <div className="ml-2">
                        {getStatusBadge(item.status)}
                      </div>
                    </div>
                    <p className="text-dark-600 mt-1 text-sm">{item.description}</p>
                  </div>
                  <div className="mt-2 sm:mt-0 flex items-center">
                    <div className="text-dark-500 text-sm mr-3">{item.timeline}</div>
                    <div className="relative flex items-center">
                      <div className="w-24 h-2 bg-dark-200 rounded-full">
                        <div 
                          className={`h-2 rounded-full ${
                            item.status === 'released' ? 'bg-green-500' : 
                            item.status === 'in-progress' ? 'bg-primary-500' : 
                            'bg-dark-400'
                          }`}
                          style={{width: `${item.completion}%`}}
                        ></div>
                      </div>
                      <span className="ml-2 text-xs text-dark-600">{item.completion}%</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="text-dark-800 text-sm mb-2 font-medium">Key Capabilities:</div>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {item.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Zap className="h-4 w-4 text-primary-500 mr-1.5 mt-0.5 flex-shrink-0" />
                      <span className="text-dark-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="rounded-lg overflow-hidden border border-dark-200">
        <div className="bg-dark-50 p-4 border-b border-dark-200">
          <h3 className="font-medium text-dark-800">Document Intelligence Strategy</h3>
        </div>
        <div className="p-4">
          <p className="text-dark-700 mb-4">
            Nolij's product strategy is centered around making document intelligence more accessible, 
            accurate, and actionable for organizations dealing with complex technical documentation.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-dark-50 p-3 rounded-lg">
              <h4 className="font-medium text-dark-800 mb-1">Near-term Focus</h4>
              <p className="text-dark-600 text-sm">
                Enhancing core extraction capabilities with improved technical document understanding and multi-document analysis.
              </p>
            </div>
            <div className="bg-dark-50 p-3 rounded-lg">
              <h4 className="font-medium text-dark-800 mb-1">Mid-term Direction</h4>
              <p className="text-dark-600 text-sm">
                Industry-specific solutions tailored to the unique document types and validation requirements of key verticals.
              </p>
            </div>
            <div className="bg-dark-50 p-3 rounded-lg">
              <h4 className="font-medium text-dark-800 mb-1">Long-term Vision</h4>
              <p className="text-dark-600 text-sm">
                End-to-end document lifecycle management with automated validation, version control, and compliance monitoring.
              </p>
            </div>
          </div>
          
          <p className="text-dark-700 text-sm">
            Have questions about our roadmap or want to request a specific feature?
            Contact your account manager or reach out to <a href="#" className="text-primary-600 hover:underline">product@nolij.ai</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductRoadmap;