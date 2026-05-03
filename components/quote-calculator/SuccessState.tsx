import { CheckCircle2 } from "lucide-react";

type SuccessStateProps = {
  fullName: string;
  email: string;
};

export function SuccessState({ fullName, email }: SuccessStateProps) {
  return (
    <div className="w-full">
      <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm p-12 text-center flex flex-col items-center animate-in fade-in zoom-in-95 duration-500">
        <div className="w-20 h-20 bg-green-50 dark:bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4">
          Quote Generated Successfully!
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400 max-w-md mx-auto text-lg">
          Thank you, <span className="font-semibold text-neutral-900 dark:text-white">{fullName || "Valued Customer"}</span>. Your estimated quote has been saved. Our team will contact you shortly at <span className="font-semibold text-neutral-900 dark:text-white">{email}</span>.
        </p>
      </div>
    </div>
  );
}
