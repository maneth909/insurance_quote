import type { FormData } from "@/hooks/useQuoteForm";

type StepPropertyValuesProps = {
  formData: FormData;
  updateFormData: (field: keyof FormData, value: number) => void;
};

export function StepPropertyValues({
  formData,
  updateFormData,
}: StepPropertyValuesProps) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-6">
        Tell us about your property
      </h2>
      <div className="space-y-10">
        {/* Slider 1 */}
        <div className="bg-neutral-50 dark:bg-neutral-800/50 p-6 rounded-2xl border border-neutral-100 dark:border-neutral-800">
          <div className="flex justify-between items-end mb-4">
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Building Cost (USD)
            </label>
            <span className="text-2xl font-bold text-blue-600 dark:text-blue-500">
              ${formData.buildingCost.toLocaleString()}
            </span>
          </div>
          <div className="relative pt-1">
            <input
              type="range"
              min="10000"
              max="1000000"
              step="5000"
              value={formData.buildingCost}
              onChange={(e) => updateFormData("buildingCost", parseInt(e.target.value))}
              className="w-full h-2 bg-neutral-200 dark:bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-blue-600 dark:accent-blue-500 hover:accent-blue-700 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </div>
          <div className="flex justify-between mt-3 text-xs font-medium text-neutral-400 dark:text-neutral-500">
            <span>$10k</span>
            <span>$1M</span>
          </div>
        </div>

        {/* Slider 2 */}
        <div className="bg-neutral-50 dark:bg-neutral-800/50 p-6 rounded-2xl border border-neutral-100 dark:border-neutral-800">
          <div className="flex justify-between items-end mb-4">
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Home Content Value (USD)
            </label>
            <span className="text-2xl font-bold text-blue-600 dark:text-blue-500">
              ${formData.contentValue.toLocaleString()}
            </span>
          </div>
          <div className="relative pt-1">
            <input
              type="range"
              min="5000"
              max="500000"
              step="1000"
              value={formData.contentValue}
              onChange={(e) => updateFormData("contentValue", parseInt(e.target.value))}
              className="w-full h-2 bg-neutral-200 dark:bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-blue-600 dark:accent-blue-500 hover:accent-blue-700 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </div>
          <div className="flex justify-between mt-3 text-xs font-medium text-neutral-400 dark:text-neutral-500">
            <span>$5k</span>
            <span>$500k</span>
          </div>
        </div>
      </div>
    </div>
  );
}
