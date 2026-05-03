import type { FormData } from "@/hooks/useQuoteForm";

type StepPersonalInfoProps = {
  formData: FormData;
  updateFormData: (field: keyof FormData, value: string) => void;
  touched: { fullName: boolean; email: boolean };
  markTouched: (field: 'fullName' | 'email') => void;
};

export function StepPersonalInfo({ formData, updateFormData, touched, markTouched }: StepPersonalInfoProps) {
  const isFullNameInvalid = touched.fullName && formData.fullName.length <= 2;
  const isEmailInvalid = touched.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-6">
        Let's get to know you
      </h2>
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
            Full Name
          </label>
          <input
            type="text"
            placeholder="Jane Doe"
            value={formData.fullName}
            onChange={(e) => updateFormData("fullName", e.target.value)}
            onBlur={() => markTouched("fullName")}
            className={`w-full rounded-xl border bg-white dark:bg-neutral-950 px-4 py-3 text-neutral-900 dark:text-white outline-none transition-colors ${
              isFullNameInvalid 
                ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500" 
                : "border-neutral-300 dark:border-neutral-700 focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            }`}
          />
          {isFullNameInvalid && <p className="text-red-500 text-xs mt-1">Please enter your full name.</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
            Email Address
          </label>
          <input
            type="email"
            placeholder="jane@example.com"
            value={formData.email}
            onChange={(e) => updateFormData("email", e.target.value)}
            onBlur={() => markTouched("email")}
            className={`w-full rounded-xl border bg-white dark:bg-neutral-950 px-4 py-3 text-neutral-900 dark:text-white outline-none transition-colors ${
              isEmailInvalid 
                ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500" 
                : "border-neutral-300 dark:border-neutral-700 focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            }`}
          />
          {isEmailInvalid && <p className="text-red-500 text-xs mt-1">Please enter a valid email address.</p>}
        </div>
      </div>
    </div>
  );
}
