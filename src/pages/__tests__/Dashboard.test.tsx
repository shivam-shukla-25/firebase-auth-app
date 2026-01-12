import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Dashboard } from "../Dashboard";
import { AuthContext } from "../../auth/AuthContext";
import { signOut, type User } from "firebase/auth";

describe("Dashboard", () => {
  it("shows user email when authenticated", () => {
    render(
      <AuthContext.Provider
        value={{
          user: { email: "test@test.com" } as User,
          status: "authenticated",
        }}
      >
        <Dashboard />
      </AuthContext.Provider>
    );

    expect(screen.getByText("test@test.com")).toBeInTheDocument();
  });

  it("calls signOut on logout", async () => {
    vi.mocked(signOut).mockResolvedValueOnce();

    render(
      <AuthContext.Provider
        value={{
          user: { email: "test@test.com" } as User,
          status: "authenticated",
        }}
      >
        <Dashboard />
      </AuthContext.Provider>
    );

    await userEvent.click(screen.getByRole("button", { name: /logout/i }));
    expect(signOut).toHaveBeenCalled();
  });
});
