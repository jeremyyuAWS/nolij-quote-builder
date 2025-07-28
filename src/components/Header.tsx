import React from 'react';
import { Monitor, Database, Settings, X, HelpCircle } from 'lucide-react';
import { usePersona } from '../contexts/PersonaContext';
import { useWelcomeModal } from '../contexts/WelcomeModalContext';

interface HeaderProps {
  onAdminToggle: () => void;
  showAdmin: boolean;
}

const Header: React.FC<HeaderProps> = ({ onAdminToggle, showAdmin }) => {
  const { activePersona, setActivePersona } = usePersona();
  const { setShowModal } = useWelcomeModal();

  return (
    <header className="bg-white border-b border-dark-200 py-3 px-4 md:px-8 sticky top-0 z-10 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Database className="h-6 w-6 text-primary-600" />
          <span className="font-semibold text-lg text-dark-900">Nolij<span className="text-primary-600">.ai</span> <span className="text-sm font-normal text-dark-500">QuoteBuilder</span></span>
        </div>
        
        <div className="flex items-center space-x-2 md:space-x-4">
          <button
            onClick={() => setShowModal(true)}
            className="p-2 text-dark-500 hover:text-primary-600 hover:bg-primary-50 rounded-full transition-colors"
            aria-label="Help"
            title="Help"
          >
            <HelpCircle className="h-5 w-5" />
          </button>
          
          <div className="bg-dark-100 rounded-full p-1 flex items-center">
            <button
              className={`px-3 py-1.5 text-sm rounded-full transition-all ${
                activePersona === 'professional' 
                  ? 'bg-white shadow-sm text-dark-900' 
                  : 'text-dark-600 hover:text-dark-900'
              }`}
              onClick={() => setActivePersona('professional')}
            >
              Professional
            </button>
            <button
              className={`px-3 py-1.5 text-sm rounded-full transition-all ${
                activePersona === 'conversational' 
                  ? 'bg-white shadow-sm text-dark-900' 
                  : 'text-dark-600 hover:text-dark-900'
              }`}
              onClick={() => setActivePersona('conversational')}
            >
              Conversational
            </button>
          </div>
          
          <button
            onClick={onAdminToggle}
            className={`flex items-center space-x-1.5 px-3 py-1.5 text-sm border rounded-lg transition-colors ${
              showAdmin 
                ? 'border-primary-300 bg-primary-50 text-primary-700 hover:bg-primary-100' 
                : 'border-dark-300 hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700'
            }`}
          >
            {showAdmin ? (
              <>
                <X className="h-4 w-4" />
                <span>Exit Admin</span>
              </>
            ) : (
              <>
                <Settings className="h-4 w-4" />
                <span className="hidden md:inline">Admin Panel</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;