export function DashboardSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="glass h-56" />
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="glass h-28" />
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="glass h-64" />
        <div className="glass h-64" />
      </div>
    </div>
  );
}
