export function ProgressBar({ step }: { step: number }) {
  const steps = [
    { id: 1, title: "Personal Info" },
    { id: 2, title: "Property Values" },
    { id: 3, title: "Plan Selection" },
    { id: 4, title: "Quote Summary" },
  ];

  return (
    <div className="relative print:hidden mb-12 mt-4">
      <div className="absolute top-4 left-0 h-1 w-full bg-neutral-200 dark:bg-neutral-800 -z-10" />
      <div
        className="absolute top-4 left-0 h-1 bg-blue-600 transition-all duration-500 ease-in-out -z-10"
        style={{ width: `${((step - 1) / 3) * 100}%` }}
      />

      <div className="flex justify-between items-center relative">
        {steps.map((node) => {
          const isActive = step >= node.id;
          return (
            <div key={node.id} className="flex flex-col items-center relative">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors duration-300 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                    : "bg-neutral-100 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-500 border-2 border-neutral-200 dark:border-neutral-700"
                }`}
              >
                {node.id}
              </div>
              <div
                className={`absolute top-10 whitespace-nowrap text-xs sm:text-sm font-medium ${
                  isActive
                    ? "text-neutral-900 dark:text-white"
                    : "text-neutral-400 dark:text-neutral-500"
                }`}
              >
                {node.title}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
