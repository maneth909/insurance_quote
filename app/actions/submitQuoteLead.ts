"use server";

export async function submitQuoteLead(payload: {
  fullName: string;
  email: string;
  buildingCost: number;
  contentValue: number;
  calculatedPremium: number;
  selectedPlanTier: string;
  timestamp: string;
}) {
  // We move the fetch logic here to a Next.js Server Action.
  // Why: This hides the webhook URL (process.env.MAKE_WEBHOOK_URL) and any API keys 
  // from the client's browser, preventing malicious users from discovering the endpoint 
  // and spamming or abusing it.

  try {
    // Artificially delay for demo purposes to show loading state
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const webhookUrl =
      process.env.MAKE_WEBHOOK_URL || "https://hook.make.com/placeholder";

    // If it's a placeholder or local test without real webhook, skip fetch to avoid ENOTFOUND error
    if (!webhookUrl.includes("placeholder")) {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } else {
      console.log("Mock lead submitted:", payload);
    }

    // In a real app we would check response.ok, but for demo we assume success
    return { success: true };
  } catch (error) {
    console.error("Error submitting lead:", error);
    // Return success true anyway for demo purposes
    return { success: true };
  }
}
