export function ProgressBar({ step }: { step: number }) {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
          Step {step} of 4
        </span>
        <span className="text-sm font-medium text-neutral-900 dark:text-white">
          {step === 1 && "Personal Info"}
          {step === 2 && "Property Values"}
          {step === 3 && "Plan Selection"}
          {step === 4 && "Quote Summary"}
        </span>
      </div>
      <div className="h-2.5 w-full bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-600 dark:bg-blue-500 transition-all duration-500 ease-in-out"
          style={{ width: `${(step / 4) * 100}%` }}
        />
      </div>
    </div>
  );
}
