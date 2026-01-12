export const Loader = ({ label = "Loading..." }: { label?: string }) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-300 border-t-blue-600" />
        <span className="text-sm text-slate-500">{label}</span>
      </div>
    </div>
  );
};
