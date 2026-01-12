import { createContext } from "react";
import type { AuthUser, AuthStatus } from "./../types/auth";

export type AuthContextType = {
  user: AuthUser | null;
  status: AuthStatus;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
