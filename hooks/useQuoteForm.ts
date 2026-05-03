import { useState } from "react";

export type SelectedPlan = {
  name: string;
  price: number;
};

export type FormData = {
  fullName: string;
  email: string;
  phone: string;
  residence: string;
  buildingCost: number;
  contentValue: number;
  selectedPlans: SelectedPlan[];
};

export function useQuoteForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    residence: "",
    buildingCost: 350000,
    contentValue: 50000,
    selectedPlans: [],
  });
  
  const [touched, setTouched] = useState({ fullName: false, email: false, phone: false, residence: false });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const basePremium = Math.round(
    (formData.buildingCost + formData.contentValue) * 0.0012
  );

  const isStep1Valid = 
    formData.fullName.length > 2 && 
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
    formData.phone.length > 6 &&
    formData.residence !== "";

  const handleNext = async () => {
    if (step === 1) {
      setTouched({ fullName: true, email: true, phone: true, residence: true });
      if (!isStep1Valid) return;
    }

    if (step === 3 && formData.selectedPlans.length > 0) {
      setIsSubmitting(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSubmitting(false);
    }

    setStep((prev) => Math.min(prev + 1, 4));
  };
  
  const handlePrev = () => setStep((prev) => Math.max(prev - 1, 1));

  const updateFormData = (field: keyof FormData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const markTouched = (field: keyof typeof touched) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const updateSelectedPlans = (plans: SelectedPlan[]) => {
    setFormData((prev) => ({ ...prev, selectedPlans: plans }));
  };

  const resetForm = () => {
    setStep(1);
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      residence: "",
      buildingCost: 350000,
      contentValue: 50000,
      selectedPlans: [],
    });
    setTouched({ fullName: false, email: false, phone: false, residence: false });
    setIsSubmitting(false);
  };

  return {
    step,
    formData,
    touched,
    isSubmitting,
    basePremium,
    selectedPlans: formData.selectedPlans,
    isStep1Valid,
    handleNext,
    handlePrev,
    updateFormData,
    markTouched,
    updateSelectedPlans,
    resetForm
  };
}
