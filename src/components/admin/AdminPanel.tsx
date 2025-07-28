import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './Tabs';
import AgentDebugger from './AgentDebugger';
import ConversationTester from './ConversationTester';
import SystemSettings from './SystemSettings';
import UsageAnalytics from './UsageAnalytics';
import { BarChart, MessageSquare, Settings, LineChart } from 'lucide-react';

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState('debugger');

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-dark-900 mb-6">Nolij Admin Panel</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="debugger">
            <BarChart className="h-4 w-4 mr-1.5" />
            Agent Debugger
          </TabsTrigger>
          <TabsTrigger value="tester">
            <MessageSquare className="h-4 w-4 mr-1.5" />
            Conversation Tester
          </TabsTrigger>
          <TabsTrigger value="analytics">
            <LineChart className="h-4 w-4 mr-1.5" />
            Usage Analytics
          </TabsTrigger>
          <TabsTrigger value="settings">
            <Settings className="h-4 w-4 mr-1.5" />
            System Settings
          </TabsTrigger>
        </TabsList>
        
        <div className="mt-6">
          <TabsContent value="debugger">
            <AgentDebugger />
          </TabsContent>
          
          <TabsContent value="tester">
            <ConversationTester />
          </TabsContent>
          
          <TabsContent value="analytics">
            <UsageAnalytics />
          </TabsContent>
          
          <TabsContent value="settings">
            <SystemSettings />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default AdminPanel;