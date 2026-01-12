import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { PublicRoute } from "../PublicRoute";
import { AuthContext } from "../AuthContext";
import { MemoryRouter } from "react-router-dom";
import type { User } from "firebase/auth";

describe("PublicRoute", () => {
  it("renders children when unauthenticated", () => {
    const { getByText } = render(
      <AuthContext.Provider value={{ user: null, status: "unauthenticated" }}>
        <MemoryRouter>
          <PublicRoute>
            <div>Sign In</div>
          </PublicRoute>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(getByText("Sign In")).toBeInTheDocument();
  });

  it("redirects authenticated users", () => {
    const { queryByText } = render(
      <AuthContext.Provider
        value={{
          user: { email: "test@test.com" } as User,
          status: "authenticated",
        }}
      >
        <MemoryRouter>
          <PublicRoute>
            <div>Sign In</div>
          </PublicRoute>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(queryByText("Sign In")).toBeNull();
  });
});
