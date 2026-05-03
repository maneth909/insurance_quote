import { QuoteCalculator } from "@/components/QuoteCalculator";

export default function Home() {
  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
          Get Your Quote
        </h1>
        <p className="mt-2 text-neutral-600 dark:text-neutral-400">
          Protect what matters most. Quick and easy home & content insurance quotes tailored for you.
        </p>
      </div>

      <QuoteCalculator />
    </div>
  );
}
