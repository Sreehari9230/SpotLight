
const SecondaryLoader = () => {
  return (
    <div className="fixed inset-0 z-50 bg-base-100 flex items-center justify-center">
      <div className="flex items-center gap-3 border border-neutral-500 px-4 py-2 text-sm tracking-widest uppercase">
        <span>Working</span>
        <span className="w-2 h-2 bg-neutral-900 animate-ping" />
      </div>
    </div>
  );
};

export default SecondaryLoader;
 
