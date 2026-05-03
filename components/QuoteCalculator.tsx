"use client";

import { useState, useEffect } from "react";
import { ChevronRight, ChevronLeft, RefreshCcw } from "lucide-react";
import { useQuoteForm } from "@/hooks/useQuoteForm";
import { ProgressBar } from "./quote-calculator/ProgressBar";
import { StepPersonalInfo } from "./quote-calculator/StepPersonalInfo";
import { StepPropertyValues } from "./quote-calculator/StepPropertyValues";
import { StepPlanSelection } from "./quote-calculator/StepPlanSelection";
import { StepSummary } from "./quote-calculator/StepSummary";

export function QuoteCalculator() {
  const {
    step, formData, touched, isSubmitting, basePremium, selectedPlans, isStep1Valid,
    handleNext, handlePrev, updateFormData, markTouched, updateSelectedPlans, resetForm
  } = useQuoteForm();

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const isNextDisabled = isSubmitting || (step === 1 && !isStep1Valid) || (step === 3 && selectedPlans.length === 0);

  return (
    <div className="w-full">
      <ProgressBar step={step} />

      <div className="rounded-2xl border border-white/20 dark:border-neutral-800 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl shadow-xl dark:shadow-neutral-900/50 p-6 sm:p-10 relative overflow-hidden">
        {step === 1 && (
          <StepPersonalInfo 
            formData={formData} 
            updateFormData={updateFormData} 
            touched={touched}
            markTouched={markTouched}
          />
        )}

        {step === 2 && (
          <StepPropertyValues formData={formData} updateFormData={updateFormData} />
        )}

        {step === 3 && (
          <StepPlanSelection basePremium={basePremium} selectedPlans={selectedPlans} updateSelectedPlans={updateSelectedPlans} />
        )}

        {step === 4 && selectedPlans.length > 0 && (
          <StepSummary formData={formData} selectedPlans={selectedPlans} />
        )}

        {/* Navigation Buttons */}
        <div className="mt-10 pt-6 border-t border-neutral-200/50 dark:border-neutral-800 flex justify-between items-center">
          <div>
            {step > 1 && step < 4 && (
              <button
                onClick={handlePrev}
                disabled={isSubmitting}
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl transition-colors text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                <ChevronLeft className="h-4 w-4" />
                Back
              </button>
            )}
          </div>
          
          <div>
            {step < 4 && (
              <button
                onClick={handleNext}
                disabled={!mounted || isNextDisabled}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 dark:disabled:bg-blue-800/50 disabled:cursor-not-allowed text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-all shadow-md shadow-blue-500/20 active:scale-[0.98]"
              >
                {step === 3 ? (
                  isSubmitting ? (
                    "Processing..."
                  ) : selectedPlans.length > 1 ? (
                    "Compare & Generate Quote"
                  ) : selectedPlans.length === 1 ? (
                    "View Summary"
                  ) : (
                    "Next Step"
                  )
                ) : (
                  "Next Step"
                )}
                {!isSubmitting && <ChevronRight className="h-4 w-4" />}
              </button>
            )}

            {step === 4 && (
              <button
                onClick={resetForm}
                className="flex items-center gap-2 bg-neutral-800 hover:bg-neutral-900 dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-neutral-900 px-6 py-2.5 rounded-xl text-sm font-medium transition-all shadow-md active:scale-[0.98]"
              >
                <RefreshCcw className="h-4 w-4" />
                Start Over
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
