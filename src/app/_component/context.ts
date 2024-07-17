import { createContext, useContext } from "react";
import { Controller } from "./controller";

export const ctx = createContext<Controller | null>(null);

export const useCtx = () => {
  const context = useContext(ctx);
  if (!context) throw new Error("Cannot find Provider");
  return context;
};
