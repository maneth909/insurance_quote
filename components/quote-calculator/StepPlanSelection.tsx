import { CheckCircle2, Check, Plus } from "lucide-react";
import type { SelectedPlan } from "@/hooks/useQuoteForm";

type StepPlanSelectionProps = {
  basePremium: number;
  selectedPlans: SelectedPlan[];
  updateSelectedPlans: (plans: SelectedPlan[]) => void;
};

export function StepPlanSelection({
  basePremium,
  selectedPlans,
  updateSelectedPlans,
}: StepPlanSelectionProps) {
  const plans = [
    {
      name: "Basic Care",
      price: basePremium,
      features: [
        "Essential structural coverage",
        "Basic content protection",
        "Standard excess",
      ],
      isPopular: false,
    },
    {
      name: "Plus Care",
      price: basePremium + 50,
      features: [
        "Extended structural limits",
        "Accidental damage included",
        "Lower excess",
        "Temporary accommodation",
      ],
      isPopular: true,
    },
    {
      name: "Ultimate Care",
      price: basePremium + 100,
      features: [
        "Comprehensive unlimited cover",
        "All accidental damage",
        "Zero excess option",
        "Personal items away from home",
      ],
      isPopular: false,
    },
  ];

  const handleToggle = (name: string, price: number) => {
    const isSelected = selectedPlans.some((p) => p.name === name);
    if (isSelected) {
      updateSelectedPlans(selectedPlans.filter((p) => p.name !== name));
    } else {
      updateSelectedPlans([...selectedPlans, { name, price }]);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
      <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-2 text-center">
        Select plans to compare
      </h2>
      <p className="text-neutral-500 dark:text-neutral-400 text-center mb-8">
        You can select multiple plans to compare their benefits.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 lg:gap-6 items-stretch">
        {plans.map((plan) => {
          const isSelected = selectedPlans.some((p) => p.name === plan.name);

          return (
            <div
              key={plan.name}
              className={`relative rounded-2xl border bg-white dark:bg-neutral-900 p-6 flex flex-col transition-all duration-300 ${
                isSelected
                  ? "border-blue-500 bg-blue-50/50 dark:bg-blue-900/10 shadow-xl shadow-blue-500/10 md:-translate-y-1 z-20"
                  : "border-neutral-200 dark:border-neutral-800 shadow-sm"
              } hover:border-blue-400/50 dark:hover:border-blue-700/50 hover:shadow-md cursor-pointer`}
              onClick={() => handleToggle(plan.name, plan.price)}
            >
              {plan.isPopular && !isSelected && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-neutral-100 border border-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  Most Popular
                </div>
              )}
              {isSelected && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1">
                  <Check className="w-3 h-3" /> Selected
                </div>
              )}
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                  {plan.name}
                </h3>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-neutral-900 dark:text-white tracking-tight">
                    ${plan.price}
                  </span>
                  <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                    /yr
                  </span>
                </div>
              </div>

              <ul className="mt-4 mb-8 flex-1 space-y-3">
                {plan.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-sm text-neutral-600 dark:text-neutral-300"
                  >
                    <CheckCircle2
                      className={`h-5 w-5 shrink-0 ${isSelected ? "text-blue-600 dark:text-blue-500" : "text-neutral-300 dark:text-neutral-600"}`}
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggle(plan.name, plan.price);
                }}
                className={`w-full py-3 px-4 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
                  isSelected
                    ? "bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50"
                    : "bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-700 active:scale-[0.98]"
                }`}
              >
                {isSelected ? (
                  <>
                    <Check className="w-4 h-4" /> Added
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" /> Add to Compare
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
