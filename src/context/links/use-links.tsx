import { useContext } from "react";
import { LinksContext, LinksContextProps } from "./context";
export const useLinks = (): LinksContextProps => {
  const context = useContext(LinksContext);
  if (!context) {
    throw new Error("useLinks must be used within an LinksProvider");
  }
  return context;
};