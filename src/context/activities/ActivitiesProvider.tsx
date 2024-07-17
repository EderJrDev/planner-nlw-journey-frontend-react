import { ReactNode, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../../lib/axios';
import { ActivitiesContext, Activitys } from './context';

export const ActivitiesProvider = ({ children }: { children: ReactNode }) => {
  const [activities, setActivities] = useState<Activitys[]>([]);
  const { tripId } = useParams<{ tripId: string }>();

  const fetchActivities = async () => {
    const response = await api.get(`/trips/${tripId}/activities`);
    setActivities(response.data.activities);
  };


  useEffect(() => {
    if (tripId) {
      fetchActivities();
    }
  }, [tripId]);

  return (
    <ActivitiesContext.Provider value={{ activities, setActivities, fetchActivities }}>
      {children}
    </ActivitiesContext.Provider>
  );
};


