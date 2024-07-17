import { useContext } from "react";
import { ActivitiesContext, ActivitiesContextProps } from "./context";
export const useActivities = (): ActivitiesContextProps => {
  const context = useContext(ActivitiesContext);
  if (!context) {
    throw new Error("useActivities must be used within an ActivitiesProvider");
  }
  return context;
};