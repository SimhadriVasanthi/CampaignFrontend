import { createContext, useContext } from "react";
const Context = createContext();

export const useMyContext = () => {
  return useContext(Context);
};

export default Context;
