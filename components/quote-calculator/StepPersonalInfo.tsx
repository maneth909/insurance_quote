import type { FormData } from "@/hooks/useQuoteForm";

type StepPersonalInfoProps = {
  formData: FormData;
  updateFormData: (field: keyof FormData, value: string) => void;
  touched: {
    fullName: boolean;
    email: boolean;
    phone: boolean;
    residence: boolean;
  };
  markTouched: (field: "fullName" | "email" | "phone" | "residence") => void;
};

export function StepPersonalInfo({
  formData,
  updateFormData,
  touched,
  markTouched,
}: StepPersonalInfoProps) {
  const isFullNameInvalid = touched.fullName && formData.fullName.length <= 2;
  const isEmailInvalid =
    touched.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
  const isPhoneInvalid = touched.phone && formData.phone.length <= 6;
  const isResidenceInvalid = touched.residence && formData.residence === "";

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-6">
        Let's get to know you
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
          {isFullNameInvalid && (
            <p className="text-red-500 text-xs mt-1">
              Please enter your full name.
            </p>
          )}
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
          {isEmailInvalid && (
            <p className="text-red-500 text-xs mt-1">
              Please enter a valid email address.
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
            Phone Number (WhatsApp)
          </label>
          <input
            type="tel"
            placeholder="+855 ..."
            value={formData.phone}
            onChange={(e) => updateFormData("phone", e.target.value)}
            onBlur={() => markTouched("phone")}
            className={`w-full rounded-xl border bg-white dark:bg-neutral-950 px-4 py-3 text-neutral-900 dark:text-white outline-none transition-colors ${
              isPhoneInvalid
                ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                : "border-neutral-300 dark:border-neutral-700 focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            }`}
          />
          {isPhoneInvalid && (
            <p className="text-red-500 text-xs mt-1">
              Please enter a valid phone number.
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
            Property Location
          </label>
          <select
            value={formData.residence}
            onChange={(e) => updateFormData("residence", e.target.value)}
            onBlur={() => markTouched("residence")}
            className={`w-full rounded-xl border bg-white dark:bg-neutral-950 px-4 py-3 outline-none transition-colors appearance-none ${
              formData.residence === ""
                ? "text-neutral-400"
                : "text-neutral-900 dark:text-white"
            } ${
              isResidenceInvalid
                ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                : "border-neutral-300 dark:border-neutral-700 focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            }`}
          >
            <option value="" disabled>
              Select a country
            </option>
            <option value="Cambodia">Cambodia</option>
            <option value="Laos">Laos</option>
            <option disabled>---</option>
            <option value="Thailand">Thailand</option>
            <option value="Vietnam">Vietnam</option>
            <option value="Malaysia">Malaysia</option>
            <option value="Singapore">Singapore</option>
            <option value="Indonesia">Indonesia</option>
            <option value="Philippines">Philippines</option>
            <option value="Myanmar">Myanmar</option>
          </select>
          {isResidenceInvalid && (
            <p className="text-red-500 text-xs mt-1">
              Please select your country of residence.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
