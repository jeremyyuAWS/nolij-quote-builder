import React, { createContext, useContext, useState } from 'react';

type Persona = 'professional' | 'conversational';

interface PersonaContextProps {
  activePersona: Persona;
  setActivePersona: (persona: Persona) => void;
}

const PersonaContext = createContext<PersonaContextProps | null>(null);

export const PersonaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activePersona, setActivePersona] = useState<Persona>('professional');

  return (
    <PersonaContext.Provider value={{ activePersona, setActivePersona }}>
      {children}
    </PersonaContext.Provider>
  );
};

export const usePersona = () => {
  const context = useContext(PersonaContext);
  if (!context) {
    throw new Error('usePersona must be used within a PersonaProvider');
  }
  return context;
};