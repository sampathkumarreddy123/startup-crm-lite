function LoadingSkeleton() {
  return (
    <div className="animate-pulse grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="h-40 bg-slate-200 rounded-2xl"
        ></div>
      ))}
    </div>
  );
}

export default LoadingSkeleton;