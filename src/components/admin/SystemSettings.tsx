import React, { useState } from 'react';
import { Save, Sliders, Users, Bell } from 'lucide-react';
import ShareableQuoteModal from './ShareableQuoteModal';

const SystemSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [showShareModal, setShowShareModal] = useState(false);
  const [notifications, setNotifications] = useState({
    emailUpdates: true,
    quoteChanges: true,
    productAlerts: false,
    weeklyReports: true
  });

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="space-y-6">
      {showShareModal && <ShareableQuoteModal onClose={() => setShowShareModal(false)} />}
      
      <div className="flex border border-dark-200 rounded-lg overflow-hidden">
        <div className="w-48 bg-dark-50 border-r border-dark-200">
          <button
            onClick={() => setActiveTab('general')}
            className={`w-full text-left px-4 py-3 ${
              activeTab === 'general' 
                ? 'bg-primary-50 text-primary-700 border-l-4 border-primary-600' 
                : 'text-dark-700 hover:bg-dark-100'
            } transition-colors`}
          >
            <Sliders className="h-4 w-4 inline-block mr-2" />
            General Settings
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`w-full text-left px-4 py-3 ${
              activeTab === 'users' 
                ? 'bg-primary-50 text-primary-700 border-l-4 border-primary-600' 
                : 'text-dark-700 hover:bg-dark-100'
            } transition-colors`}
          >
            <Users className="h-4 w-4 inline-block mr-2" />
            User Management
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`w-full text-left px-4 py-3 ${
              activeTab === 'notifications' 
                ? 'bg-primary-50 text-primary-700 border-l-4 border-primary-600' 
                : 'text-dark-700 hover:bg-dark-100'
            } transition-colors`}
          >
            <Bell className="h-4 w-4 inline-block mr-2" />
            Notifications
          </button>
        </div>
        
        <div className="flex-1 p-6">
          {activeTab === 'general' && (
            <>
              <div className="bg-white rounded-lg border border-dark-200 shadow-sm">
                <div className="p-4 border-b border-dark-200">
                  <h2 className="font-medium text-dark-800">System Prompt Settings</h2>
                </div>
                <div className="p-4">
                  <textarea
                    className="w-full h-40 p-3 border border-dark-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 font-mono text-sm"
                    defaultValue={`You are Nolij.ai's document intelligence assistant. Your task is to extract, validate, and analyze information from technical documents, specifications, and product catalogs.

When analyzing documentation, check for:
1. Critical technical specifications and requirements
2. Component compatibility and dependencies
3. Required accessories and supporting elements
4. End-of-Life (EOL) or End-of-Service (EOS) status

Provide specific, actionable insights based on document analysis and suggest alternatives when necessary. Reference specific sections of documents to support your recommendations.`}
                  />
                  <div className="mt-3 flex justify-end">
                    <button className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors">
                      Save System Prompt
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 bg-white rounded-lg border border-dark-200 shadow-sm">
                <div className="p-4 border-b border-dark-200">
                  <h2 className="font-medium text-dark-800">Integration Settings</h2>
                </div>
                <div className="p-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-dark-700 mb-1">
                      API Endpoint URL
                    </label>
                    <input
                      type="text"
                      className="w-full py-2 px-3 border border-dark-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      placeholder="https://api.example.com/agent"
                      defaultValue="https://api.nolij.ai/document-intelligence"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-dark-700 mb-1">
                      API Key
                    </label>
                    <input
                      type="password"
                      className="w-full py-2 px-3 border border-dark-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      placeholder="sk-•••••••••••••••••••••••••"
                      defaultValue="sk-•••••••••••••••••••••••••"
                    />
                  </div>
                  
                  <div className="pt-2">
                    <button className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors">
                      Save Integration Settings
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 bg-white rounded-lg border border-dark-200 shadow-sm">
                <div className="p-4 border-b border-dark-200">
                  <h2 className="font-medium text-dark-800">Sharing Options</h2>
                </div>
                <div className="p-4">
                  <p className="text-dark-600 mb-4">
                    Create shareable links for quotes that can be sent to clients and colleagues.
                  </p>
                  <button 
                    onClick={() => setShowShareModal(true)}
                    className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors"
                  >
                    Generate Shareable Quote Link
                  </button>
                </div>
              </div>
            </>
          )}
          
          {activeTab === 'users' && (
            <div className="bg-white rounded-lg border border-dark-200 shadow-sm">
              <div className="p-4 border-b border-dark-200">
                <h2 className="font-medium text-dark-800">User Management</h2>
              </div>
              <div className="p-4">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-dark-200">
                    <thead className="bg-dark-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-dark-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-dark-500 uppercase tracking-wider">
                          Email
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-dark-500 uppercase tracking-wider">
                          Role
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-dark-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-dark-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-dark-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-dark-900">John Smith</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-dark-500">john@example.com</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-dark-500">Admin</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Active
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <a href="#" className="text-primary-600 hover:text-primary-900">Edit</a>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-dark-900">Jane Doe</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-dark-500">jane@example.com</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-dark-500">Editor</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Active
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <a href="#" className="text-primary-600 hover:text-primary-900">Edit</a>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-dark-900">Robert Johnson</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-dark-500">robert@example.com</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-dark-500">Viewer</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                            Inactive
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <a href="#" className="text-primary-600 hover:text-primary-900">Edit</a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-4">
                  <button className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors">
                    Add User
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'notifications' && (
            <div className="bg-white rounded-lg border border-dark-200 shadow-sm">
              <div className="p-4 border-b border-dark-200">
                <h2 className="font-medium text-dark-800">Notification Settings</h2>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-2 border-b border-dark-100">
                    <div>
                      <h3 className="text-sm font-medium text-dark-900">Email Updates</h3>
                      <p className="text-sm text-dark-500">Receive updates via email</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={notifications.emailUpdates}
                        onChange={() => handleNotificationChange('emailUpdates')} 
                      />
                      <div className="w-11 h-6 bg-dark-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between py-2 border-b border-dark-100">
                    <div>
                      <h3 className="text-sm font-medium text-dark-900">Quote Change Notifications</h3>
                      <p className="text-sm text-dark-500">Get notified when quotes are updated</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={notifications.quoteChanges}
                        onChange={() => handleNotificationChange('quoteChanges')} 
                      />
                      <div className="w-11 h-6 bg-dark-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between py-2 border-b border-dark-100">
                    <div>
                      <h3 className="text-sm font-medium text-dark-900">Product Alert Notifications</h3>
                      <p className="text-sm text-dark-500">Get notified about EOL products and alternatives</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={notifications.productAlerts}
                        onChange={() => handleNotificationChange('productAlerts')} 
                      />
                      <div className="w-11 h-6 bg-dark-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <h3 className="text-sm font-medium text-dark-900">Weekly Summary Reports</h3>
                      <p className="text-sm text-dark-500">Receive weekly summary of all activities</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={notifications.weeklyReports}
                        onChange={() => handleNotificationChange('weeklyReports')} 
                      />
                      <div className="w-11 h-6 bg-dark-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>
                </div>
                
                <div className="mt-6">
                  <button className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors flex items-center">
                    <Save className="h-4 w-4 mr-2" />
                    Save Notification Settings
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SystemSettings;