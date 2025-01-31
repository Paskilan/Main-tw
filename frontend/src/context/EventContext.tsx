import { createContext, useContext, useState, ReactNode } from 'react';

type EventContextType = {
  selectedEventId: string | null;
  setSelectedEventId: (id: string | null) => void;
};

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider = ({ children }: { children: ReactNode }) => {
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  return (
    <EventContext.Provider value={{ selectedEventId, setSelectedEventId }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEventContext = () => {
  const context = useContext(EventContext);
  if (context === undefined) {
    throw new Error('useEventContext must be used within an EventProvider');
  }
  return context;
};
