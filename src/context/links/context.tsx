import { createContext } from "react";
export interface LinksProps {
  title: string;
  url: string
}
export interface LinksContextProps {
  links: LinksProps[];
  setLinks: React.Dispatch<React.SetStateAction<LinksProps[]>>;
  fetchLinks: () => void;
}

export const LinksContext = createContext<LinksContextProps | undefined>(undefined);