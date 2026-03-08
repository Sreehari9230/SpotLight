const PrimaryLoader = () => {
  return (
    <div className="fixed inset-0 z-50 bg-base-100 flex items-center justify-center">
      <div className="flex items-center gap-3 border border-neutral-500 px-4 py-2 text-sm tracking-widest uppercase">
        <span>Working this may take a while cuz i hosted the backend in render so for the first tile it may tak 40s to a min</span>
        <span className="w-2 h-2 bg-neutral-900 animate-ping" />
      </div>
    </div>
  );
};

export default PrimaryLoader;
