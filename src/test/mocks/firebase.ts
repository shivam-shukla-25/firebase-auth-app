import { vi } from "vitest";

export const mockUser = {
  email: "test@example.com",
};

export const signInWithEmailAndPassword = vi.fn();
export const signOut = vi.fn();
export const onAuthStateChanged = vi.fn();

vi.mock("firebase/auth", () => ({
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
}));
