"use client";

import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import {
  Check,
  CheckCircle2,
  Download,
  MessageCircle,
  Send,
  X,
} from "lucide-react";
import type { FormData, SelectedPlan } from "@/hooks/useQuoteForm";

type StepSummaryProps = {
  formData: FormData;
  selectedPlans: SelectedPlan[];
};

export function StepSummary({ formData, selectedPlans }: StepSummaryProps) {
  const totalPrice = selectedPlans.reduce((sum, plan) => sum + plan.price, 0);
  const planNames = selectedPlans.map((p) => p.name).join(", ");

  const componentRef = useRef<HTMLDivElement>(null);

  // Use a pseudo-random ref just for display
  const quoteRef = `AUTO-GEN-${Math.floor(100000 + Math.random() * 900000)}`;
  const dateStr = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const whatsappText = encodeURIComponent(
    `Hello! I'm interested in the ${planNames} insurance plan(s) totaling $${totalPrice}/yr. Quote Ref: ${quoteRef}`,
  );
  const telegramText = encodeURIComponent(
    `Check out my WECARE Insurance quote for ${planNames} ($${totalPrice}/yr). Ref: ${quoteRef}`,
  );

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: "WECARE_Insurance_Quote",
  });

  // Define comparison metrics for the table
  const comparisonMetrics = [
    {
      name: "Structural Limit",
      getValue: () => `$${formData.buildingCost.toLocaleString()}`,
    },
    {
      name: "Content Limit",
      getValue: () => `$${formData.contentValue.toLocaleString()}`,
    },
    {
      name: "Fire & Lightning",
      getValue: () => true,
    },
    {
      name: "Theft",
      getValue: (planName: string) => planName !== "Basic Care",
    },
    {
      name: "Alternative Accommodation",
      getValue: (planName: string) => {
        if (planName.includes("Ultimate")) return "Up to 12 months";
        if (planName.includes("Plus")) return "Up to 3 months";
        return "X";
      },
    },
  ];

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500 w-full flex flex-col items-center pt-4">
      {/* Web Action Bar (Not Printable) */}
      <div className="w-full max-w-4xl flex flex-wrap justify-end gap-3 mb-6">
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 py-2 px-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors shadow-sm font-medium text-sm"
        >
          <Download className="w-4 h-4 text-neutral-500" />
          Download PDF
        </button>
        <a
          href={`https://wa.me/?text=${whatsappText}`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 py-2 px-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors shadow-sm font-medium text-sm"
        >
          <MessageCircle className="w-4 h-4 text-green-500" />
          WhatsApp
        </a>
        <a
          href={`https://t.me/share/url?url=${encodeURIComponent(
            "https://wecare-insurance.com",
          )}&text=${telegramText}`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 py-2 px-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors shadow-sm font-medium text-sm"
        >
          <Send className="w-4 h-4 text-blue-500" />
          Telegram
        </a>
      </div>

      {/* The A4 Document Container */}
      <div
        ref={componentRef}
        // ADDED print:shadow-none and print:border-none here
        className="w-full max-w-4xl bg-white text-black border border-neutral-200 shadow-lg print:shadow-none print:border-none p-8 lg:p-12"
      >
        {/* Letterhead Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start border-b border-neutral-200 pb-8 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-blue-600">
              WECARE
              <span className="text-black">Insurance</span>
            </h1>
            <p className="text-sm text-neutral-500 mt-1">
              Comprehensive Protection Plan
            </p>
          </div>
          <div className="mt-4 sm:mt-0 text-left sm:text-right">
            <p className="text-sm font-medium text-black">
              Quote Ref: {quoteRef}
            </p>
            <p className="text-sm text-neutral-500">Date: {dateStr}</p>
            <p className="text-sm text-neutral-500">Valid for 30 Days</p>
          </div>
        </div>

        {/* Dynamic Body */}
        {selectedPlans.length === 1 ? (
          <div className="max-w-xl mx-auto text-center mt-12 mb-16">
            <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-medium text-neutral-500 mb-2">
              Prepared for {formData.fullName}
            </h2>
            <div className="text-5xl font-bold text-black mb-4">
              ${totalPrice}
              <span className="text-xl font-normal text-neutral-500">/yr</span>
            </div>
            <div className="inline-block px-4 py-1 rounded-full bg-blue-50 text-blue-700 text-lg font-semibold mb-10">
              {selectedPlans[0].name}
            </div>

            <div className="border border-neutral-200 rounded-xl p-6 text-left">
              <h3 className="font-semibold text-black mb-4">
                Coverage Summary
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500">Building Limit</span>
                  <span className="font-medium text-black">
                    ${formData.buildingCost.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500">Content Limit</span>
                  <span className="font-medium text-black">
                    ${formData.contentValue.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500">Email</span>
                  <span className="font-medium text-black">
                    {formData.email}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-8 overflow-x-auto pb-4">
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-black">
                Plan Comparison
              </h2>
              <p className="text-sm text-neutral-500">
                Prepared for {formData.fullName}
              </p>
            </div>

            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr>
                  <th className="p-4 border-b border-neutral-200 text-sm font-semibold text-neutral-500">
                    Feature / Plan
                  </th>
                  {selectedPlans.map((plan) => (
                    <th
                      key={plan.name}
                      className="p-4 border-b border-neutral-200 text-center"
                    >
                      <div className="font-bold text-black text-lg">
                        {plan.name}
                      </div>
                      <div className="text-blue-600 font-semibold mt-1">
                        ${plan.price}/yr
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonMetrics.map((metric, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-neutral-100 last:border-0"
                  >
                    <td className="p-4 text-sm font-medium text-neutral-700">
                      {metric.name}
                    </td>
                    {selectedPlans.map((plan) => {
                      const value = metric.getValue(plan.name);
                      return (
                        <td
                          key={plan.name}
                          className="p-4 text-center text-sm text-neutral-600"
                        >
                          {typeof value === "boolean" ? (
                            value ? (
                              <Check className="w-5 h-5 text-green-500 mx-auto" />
                            ) : (
                              <X className="w-5 h-5 text-neutral-300 mx-auto" />
                            )
                          ) : value === "X" ? (
                            <X className="w-5 h-5 text-neutral-300 mx-auto" />
                          ) : (
                            <span className="font-medium text-black">
                              {value}
                            </span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
