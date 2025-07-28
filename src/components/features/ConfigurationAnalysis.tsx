import React, { useState } from 'react';
import { BarChart, Check, AlertCircle, ArrowRight } from 'lucide-react';

const ConfigurationAnalysis: React.FC = () => {
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  
  const presets = [
    {
      id: 'network-small',
      name: 'Small Network Deployment',
      description: 'Office network with 12 cameras, 8 phones, and 2 access points',
      icon: '🏢'
    },
    {
      id: 'network-medium',
      name: 'Medium Enterprise Setup',
      description: 'Campus network with 45 cameras, 30 phones, and 10 access points',
      icon: '🏙️'
    },
    {
      id: 'datacenter',
      name: 'Data Center Configuration',
      description: 'Server room with 8 racks, 24 servers, and redundant power',
      icon: '🖥️'
    }
  ];
  
  const analyzeConfiguration = (presetId: string) => {
    setSelectedPreset(presetId);
    setIsAnalyzing(true);
    setAnalysisResult(null);
    
    // Simulate analysis delay
    setTimeout(() => {
      setIsAnalyzing(false);
      
      if (presetId === 'network-small') {
        setAnalysisResult({
          valid: true,
          powerBudget: {
            total: 370,
            used: 116,
            remaining: 254,
            items: [
              { name: 'Security Cameras (12)', usage: 60 },
              { name: 'VoIP Phones (8)', usage: 56 },
              { name: 'Access Points (2)', usage: 0 },
            ]
          },
          portUsage: {
            total: 24,
            used: 22,
            remaining: 2
          },
          issues: [],
          recommendations: [
            'Consider reserving 20% power capacity for future expansion',
            'Plan for additional switch if more than 2 devices will be added'
          ]
        });
      } else if (presetId === 'network-medium') {
        setAnalysisResult({
          valid: false,
          powerBudget: {
            total: 740,
            used: 472,
            remaining: 268,
            items: [
              { name: 'Security Cameras (45)', usage: 225 },
              { name: 'VoIP Phones (30)', usage: 210 },
              { name: 'Access Points (10)', usage: 37 }
            ]
          },
          portUsage: {
            total: 48,
            used: 85,
            remaining: -37
          },
          issues: [
            'Insufficient ports: Configuration requires 85 ports but only 48 are available',
            'Additional switches needed to support all devices'
          ],
          recommendations: [
            'Add at least one additional 48-port switch',
            'Consider power redundancy for critical devices',
            'Implement VLANs for security between device types'
          ]
        });
      } else if (presetId === 'datacenter') {
        setAnalysisResult({
          valid: true,
          powerBudget: {
            total: 12800,
            used: 9600,
            remaining: 3200,
            items: [
              { name: 'Servers (24)', usage: 8400 },
              { name: 'Networking Equipment', usage: 1200 },
            ]
          },
          cooling: {
            requiredBTU: 32640,
            currentCapacity: 40000,
            status: 'Sufficient'
          },
          issues: [],
          recommendations: [
            'Implement power usage monitoring for capacity planning',
            'Regular cooling system maintenance recommended',
            'Consider redundant power supplies for critical servers'
          ]
        });
      }
    }, 2000);
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-dark-900 mb-2">Configuration Analysis</h2>
        <p className="text-dark-600">
          Nolij validates technical specifications, analyzes power and resource requirements, 
          and identifies potential configuration issues before deployment.
        </p>
      </div>
      
      {!selectedPreset && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {presets.map(preset => (
            <div 
              key={preset.id}
              className="border rounded-lg p-4 hover:border-primary-300 hover:shadow-md transition-all cursor-pointer"
              onClick={() => analyzeConfiguration(preset.id)}
            >
              <div className="text-2xl mb-2">{preset.icon}</div>
              <h3 className="font-medium text-dark-800 mb-1">{preset.name}</h3>
              <p className="text-dark-500 text-sm">{preset.description}</p>
            </div>
          ))}
        </div>
      )}
      
      {isAnalyzing && (
        <div className="border rounded-lg p-6 bg-dark-50 text-center">
          <div className="inline-block p-3 bg-primary-100 rounded-full mb-3">
            <BarChart className="h-6 w-6 text-primary-600 animate-pulse" />
          </div>
          <h3 className="text-lg font-medium text-dark-900 mb-2">Analyzing Configuration</h3>
          <p className="text-dark-600 mb-4">
            Nolij is validating specifications, calculating resource requirements, and identifying potential issues...
          </p>
          <div className="w-full max-w-md mx-auto bg-dark-200 rounded-full h-2 mb-1">
            <div className="bg-primary-500 h-2 rounded-full animate-[progress_2s_ease-in-out]" style={{width: '100%'}}></div>
          </div>
        </div>
      )}
      
      {analysisResult && (
        <div className="space-y-5">
          <div className={`border rounded-lg p-4 ${
            analysisResult.valid ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
          } flex items-start`}>
            {analysisResult.valid ? (
              <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
            ) : (
              <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
            )}
            <div>
              <h3 className="font-medium text-dark-900">
                {analysisResult.valid ? 'Valid Configuration' : 'Configuration Issues Detected'}
              </h3>
              <p className="text-dark-600 text-sm">
                {analysisResult.valid 
                  ? 'Nolij has validated this configuration and found it to be technically sound.'
                  : 'Nolij has identified issues that need to be addressed before deployment.'}
              </p>
            </div>
          </div>
          
          {/* Power Budget Analysis */}
          {analysisResult.powerBudget && (
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-dark-50 p-3 border-b border-dark-200">
                <h3 className="font-medium text-dark-800">Power Budget Analysis</h3>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-dark-700">Total Available</span>
                  <span className="font-medium text-dark-900">{analysisResult.powerBudget.total}W</span>
                </div>
                <div className="w-full bg-dark-100 rounded-full h-4 mb-3">
                  <div 
                    className={`h-4 rounded-full ${
                      analysisResult.powerBudget.used / analysisResult.powerBudget.total > 0.8 
                        ? 'bg-red-500' 
                        : analysisResult.powerBudget.used / analysisResult.powerBudget.total > 0.6
                          ? 'bg-amber-500'
                          : 'bg-green-500'
                    }`}
                    style={{width: `${(analysisResult.powerBudget.used / analysisResult.powerBudget.total) * 100}%`}}
                  ></div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="bg-dark-50 p-3 rounded">
                    <div className="text-dark-500 text-sm">Used</div>
                    <div className="text-lg font-medium text-dark-900">{analysisResult.powerBudget.used}W</div>
                    <div className="text-dark-500 text-sm">
                      ({Math.round((analysisResult.powerBudget.used / analysisResult.powerBudget.total) * 100)}%)
                    </div>
                  </div>
                  <div className="bg-dark-50 p-3 rounded">
                    <div className="text-dark-500 text-sm">Remaining</div>
                    <div className="text-lg font-medium text-dark-900">{analysisResult.powerBudget.remaining}W</div>
                    <div className="text-dark-500 text-sm">
                      ({Math.round((analysisResult.powerBudget.remaining / analysisResult.powerBudget.total) * 100)}%)
                    </div>
                  </div>
                </div>
                
                <h4 className="font-medium text-dark-700 mb-2">Power Usage Breakdown</h4>
                <div className="space-y-2">
                  {analysisResult.powerBudget.items.map((item: any, index: number) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-dark-600">{item.name}</span>
                      <span className="text-dark-800">{item.usage}W</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {/* Port Usage */}
          {analysisResult.portUsage && (
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-dark-50 p-3 border-b border-dark-200">
                <h3 className="font-medium text-dark-800">Port Allocation</h3>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-dark-700">Total Ports</span>
                  <span className="font-medium text-dark-900">{analysisResult.portUsage.total}</span>
                </div>
                <div className="w-full bg-dark-100 rounded-full h-4 mb-3">
                  <div 
                    className={`h-4 rounded-full ${
                      analysisResult.portUsage.remaining < 0 
                        ? 'bg-red-500' 
                        : analysisResult.portUsage.remaining < 5
                          ? 'bg-amber-500'
                          : 'bg-green-500'
                    }`}
                    style={{width: `${Math.min((analysisResult.portUsage.used / analysisResult.portUsage.total) * 100, 100)}%`}}
                  ></div>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-dark-50 p-3 rounded">
                    <div className="text-dark-500 text-sm">Required Ports</div>
                    <div className="text-lg font-medium text-dark-900">{analysisResult.portUsage.used}</div>
                  </div>
                  <div className={`p-3 rounded ${
                    analysisResult.portUsage.remaining < 0 ? 'bg-red-50' : 'bg-dark-50'
                  }`}>
                    <div className="text-dark-500 text-sm">Remaining</div>
                    <div className={`text-lg font-medium ${
                      analysisResult.portUsage.remaining < 0 ? 'text-red-600' : 'text-dark-900'
                    }`}>
                      {analysisResult.portUsage.remaining}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Cooling Analysis for Datacenter */}
          {analysisResult.cooling && (
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-dark-50 p-3 border-b border-dark-200">
                <h3 className="font-medium text-dark-800">Cooling Analysis</h3>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-dark-500 text-sm">Required Cooling</div>
                    <div className="text-lg font-medium text-dark-900">{analysisResult.cooling.requiredBTU} BTU/hr</div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-dark-400" />
                  <div>
                    <div className="text-dark-500 text-sm">Current Capacity</div>
                    <div className="text-lg font-medium text-dark-900">{analysisResult.cooling.currentCapacity} BTU/hr</div>
                  </div>
                  <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">
                    {analysisResult.cooling.status}
                  </div>
                </div>
                
                <div className="text-dark-600 text-sm">
                  <p>Based on power consumption of {analysisResult.powerBudget.used}W, requiring approximately {analysisResult.cooling.requiredBTU} BTU/hr of cooling capacity.</p>
                </div>
              </div>
            </div>
          )}
          
          {/* Issues */}
          {analysisResult.issues && analysisResult.issues.length > 0 && (
            <div className="border rounded-lg overflow-hidden border-red-200">
              <div className="bg-red-50 p-3 border-b border-red-200">
                <h3 className="font-medium text-dark-800">Issues to Resolve</h3>
              </div>
              <div className="p-4">
                <ul className="space-y-2">
                  {analysisResult.issues.map((issue: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-dark-800">{issue}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          
          {/* Recommendations */}
          <div className="border rounded-lg overflow-hidden border-primary-200">
            <div className="bg-primary-50 p-3 border-b border-primary-200">
              <h3 className="font-medium text-dark-800">Nolij Recommendations</h3>
            </div>
            <div className="p-4">
              <ul className="space-y-2">
                {analysisResult.recommendations.map((rec: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-primary-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-dark-800">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="flex justify-end">
            <button 
              onClick={() => {
                setSelectedPreset(null);
                setAnalysisResult(null);
              }}
              className="bg-dark-100 text-dark-700 px-4 py-2 rounded-md hover:bg-dark-200 transition-colors"
            >
              Analyze Another Configuration
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConfigurationAnalysis;