import { BarChart3 } from "lucide-react";

function EmptyAnalyticsState() {
  return (
    <div className="text-center py-20">
      <BarChart3
        size={48}
        className="mx-auto text-slate-400"
      />

      <h2 className="text-2xl font-semibold mt-6">
        No analytics available yet
      </h2>

      <p className="text-slate-500 mt-3">
        Add your first lead to start tracking business performance.
      </p>
    </div>
  );
}

export default EmptyAnalyticsState;