import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ProtectedRoute } from "../ProtectedRoute";
import { AuthContext } from "../AuthContext";
import { MemoryRouter } from "react-router-dom";
import type { User } from "firebase/auth";

describe("ProtectedRoute", () => {
  it("does not render children while loading", () => {
    const { queryByText } = render(
      <AuthContext.Provider value={{ user: null, status: "loading" }}>
        <MemoryRouter>
          <ProtectedRoute>
            <div>Secret</div>
          </ProtectedRoute>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(queryByText("Secret")).toBeNull();
  });

  it("redirects unauthenticated users", () => {
    const { queryByText } = render(
      <AuthContext.Provider value={{ user: null, status: "unauthenticated" }}>
        <MemoryRouter>
          <ProtectedRoute>
            <div>Secret</div>
          </ProtectedRoute>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(queryByText("Secret")).toBeNull();
  });

  it("renders children when authenticated", () => {
    const { getByText } = render(
      <AuthContext.Provider
        value={{
          user: { email: "test@test.com" } as User,
          status: "authenticated",
        }}
      >
        <MemoryRouter>
          <ProtectedRoute>
            <div>Secret</div>
          </ProtectedRoute>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(getByText("Secret")).toBeInTheDocument();
  });
});
