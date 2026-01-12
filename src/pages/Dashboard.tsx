import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useAuth } from "../auth/hooks/useAuth";
import { Loader } from "../components/Loader";
import { useCallback } from "react";

export const Dashboard = () => {
  const { user, status } = useAuth();

  const handleLogout = useCallback(async () => {
    try {
      await signOut(auth);
    } catch {
      console.error("Failed to log out");
    }
  }, []);

  if (status === "loading") {
    return <Loader label="Loading dashboard..." />;
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="bg-white border-b border-slate-200">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <h1 className="text-lg font-semibold text-slate-800">
            Firebase Auth App
          </h1>

          <button
            onClick={handleLogout}
            className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 cursor-pointer"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        <h2 className="text-2xl font-semibold text-slate-800">Dashboard</h2>
        <p className="mt-1 text-slate-600">Welcome back</p>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <DashboardCard title="Logged-in User">{user?.email}</DashboardCard>

          <DashboardCard title="Authentication Method">
            Email / Password
          </DashboardCard>

          <DashboardCard title="Session Status" valueClass="text-green-600">
            Active
          </DashboardCard>
        </div>
      </main>
    </div>
  );
};

const DashboardCard = ({
  title,
  children,
  valueClass = "text-slate-800",
}: {
  title: string;
  children: React.ReactNode;
  valueClass?: string;
}) => (
  <div className="rounded-xl bg-white p-6 shadow-sm">
    <h3 className="text-sm font-medium text-slate-500">{title}</h3>
    <p className={`mt-2 font-semibold ${valueClass}`}>{children}</p>
  </div>
);
