import { renderHook } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { AuthProvider } from "../AuthProvider";
import { useAuth } from "../hooks/useAuth";

describe("useAuth", () => {
  it("throws when used outside AuthProvider", () => {
    expect(() => renderHook(() => useAuth())).toThrow();
  });

  it("returns auth context when inside provider", () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    expect(result.current).toHaveProperty("user");
    expect(result.current).toHaveProperty("status");
  });
});
