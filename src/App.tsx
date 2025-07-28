import React, { useState } from 'react';
import Header from './components/Header';
import ChatContainer from './components/chat/ChatContainer';
import TagSelector from './components/TagSelector';
import AdminPanel from './components/admin/AdminPanel';
import FeatureTabs from './components/features/FeatureTabs';
import WelcomeModal from './components/WelcomeModal';
import { PersonaProvider } from './contexts/PersonaContext';
import { ChatProvider } from './contexts/ChatContext';
import { WelcomeModalProvider } from './contexts/WelcomeModalContext';

function App() {
  const [showAdmin, setShowAdmin] = useState(false);

  return (
    <PersonaProvider>
      <ChatProvider>
        <WelcomeModalProvider>
          <div className="min-h-screen bg-gradient-to-b from-dark-50 to-dark-100 flex flex-col">
            <Header onAdminToggle={() => setShowAdmin(!showAdmin)} showAdmin={showAdmin} />
            
            <main className="flex-grow px-4 py-6 md:px-8">
              {showAdmin ? (
                <AdminPanel />
              ) : (
                <div className="max-w-7xl mx-auto">
                  <section className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-dark-900 mb-4">
                      AI-Powered Document Intelligence
                    </h1>
                    <p className="text-lg text-dark-600 max-w-3xl">
                      Nolij's AI platform extracts, validates, and analyzes information from technical documents
                      to streamline quoting, ensure accuracy, and improve decision-making.
                    </p>
                  </section>
                  
                  <section className="mb-8">
                    <TagSelector />
                  </section>
                  
                  <section className="mb-8">
                    <FeatureTabs />
                  </section>
                  
                  <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                    <div className="bg-white rounded-lg shadow-md p-6 border border-dark-200 hover:border-primary-300 transition-colors">
                      <h3 className="text-lg font-medium text-dark-800 mb-2">Intelligent Document Processing</h3>
                      <p className="text-dark-600">
                        Our system automatically extracts and validates key information from your technical documents, 
                        specifications, and catalogs.
                      </p>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6 border border-dark-200 hover:border-primary-300 transition-colors">
                      <h3 className="text-lg font-medium text-dark-800 mb-2">Compatibility Verification</h3>
                      <p className="text-dark-600">
                        Verify technical compatibility between components and identify potential issues before 
                        submitting quotes.
                      </p>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6 border border-dark-200 hover:border-primary-300 transition-colors">
                      <h3 className="text-lg font-medium text-dark-800 mb-2">Smart Product Recommendations</h3>
                      <p className="text-dark-600">
                        Receive intelligent suggestions for alternatives when products are discontinued or unavailable, 
                        based on your requirements.
                      </p>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6 border border-dark-200 hover:border-primary-300 transition-colors">
                      <h3 className="text-lg font-medium text-dark-800 mb-2">Knowledge-Based Decision Support</h3>
                      <p className="text-dark-600">
                        All recommendations are backed by Nolij's extensive knowledge graph and document understanding capabilities.
                      </p>
                    </div>
                  </section>
                </div>
              )}
            </main>
            
            <ChatContainer />
            <WelcomeModal />
          </div>
        </WelcomeModalProvider>
      </ChatProvider>
    </PersonaProvider>
  );
}

export default App;