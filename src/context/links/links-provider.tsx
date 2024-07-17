import { ReactNode, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../../lib/axios';
import { LinksContext, LinksProps } from './context';

export const LinksProvider = ({ children }: { children: ReactNode }) => {
  const [links, setLinks] = useState<LinksProps[]>([])
  
  const { tripId } = useParams<{ tripId: string }>();
  const fetchLinks = async () => {
    const response = await api.get(`/trips/${tripId}/links`);
    setLinks(response.data.links);
  };

  useEffect(() => {
    if (tripId) {
      fetchLinks();
    }
  }, [tripId]);

  return (
    <LinksContext.Provider value={{ links, setLinks, fetchLinks }}>
      {children}
    </LinksContext.Provider>
  );
};


