import { render } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { AuthProvider } from "../AuthProvider";
import { onAuthStateChanged } from "firebase/auth";

describe("AuthProvider", () => {
  it("subscribes to auth state on mount", () => {
    const unsubscribe = vi.fn();
    vi.mocked(onAuthStateChanged).mockReturnValue(unsubscribe);

    render(
      <AuthProvider>
        <div>App</div>
      </AuthProvider>
    );

    expect(onAuthStateChanged).toHaveBeenCalled();
  });

  it("cleans up auth subscription on unmount", () => {
    const unsubscribe = vi.fn();
    vi.mocked(onAuthStateChanged).mockReturnValue(unsubscribe);

    const { unmount } = render(
      <AuthProvider>
        <div>App</div>
      </AuthProvider>
    );

    unmount();
    expect(unsubscribe).toHaveBeenCalled();
  });
});