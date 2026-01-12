import type { User } from "firebase/auth";

export type AuthUser = User;

export type AuthStatus = "loading" | "authenticated" | "unauthenticated";
