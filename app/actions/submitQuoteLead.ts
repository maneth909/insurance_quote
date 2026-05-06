"use server";

export async function submitQuoteLead(payload: {
  refId: string;
  fullName: string;
  email: string;
  phone: string;
  propertyLocation: string;
  buildingValue: number;
  contentValue: number;
  calculatedBase: number;
  selectedPlans: string;
}) {
  try {
    const webhookUrl =
      process.env.MAKE_WEBHOOK_URL || "https://hook.make.com/placeholder";

    if (!webhookUrl.includes("placeholder")) {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error(`Webhook failed with status: ${response.status}`);
      }
    } else {
      console.log("Mock lead submitted:", payload);

      await new Promise((resolve) => setTimeout(resolve, 1500));
    }

    return { success: true };
  } catch (error) {
    console.error("Error submitting lead:", error);

    return { success: false };
  }
}
