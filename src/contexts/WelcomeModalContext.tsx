import React, { createContext, useContext, useState, useEffect } from 'react';

type WelcomeModalContextType = {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  hideModalPermanently: () => void;
};

const WelcomeModalContext = createContext<WelcomeModalContextType | null>(null);

export const WelcomeModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [showModal, setShowModal] = useState(false);

  // Check localStorage on mount to see if we should show the welcome modal
  useEffect(() => {
    const hideWelcomeModal = localStorage.getItem('hideWelcomeModal');
    if (hideWelcomeModal !== 'true') {
      setShowModal(true);
    }
  }, []);

  const hideModalPermanently = () => {
    localStorage.setItem('hideWelcomeModal', 'true');
    setShowModal(false);
  };

  return (
    <WelcomeModalContext.Provider value={{ showModal, setShowModal, hideModalPermanently }}>
      {children}
    </WelcomeModalContext.Provider>
  );
};

export const useWelcomeModal = () => {
  const context = useContext(WelcomeModalContext);
  if (!context) {
    throw new Error('useWelcomeModal must be used within a WelcomeModalProvider');
  }
  return context;
};