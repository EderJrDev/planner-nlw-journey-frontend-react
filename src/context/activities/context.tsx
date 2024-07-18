import { createContext } from "react";

export interface Activity {
  id: string;
  title: string;
  occurs_at: string;
  trip_id: string;
}
export interface Activitys {
  date: string;
  activities : Activity []
}
export interface ActivitiesContextProps {
  activities: Activitys[];
  setActivities: React.Dispatch<React.SetStateAction<Activitys[]>>;
  fetchActivities: () => void;
}

export const ActivitiesContext = createContext<ActivitiesContextProps | undefined>(undefined);