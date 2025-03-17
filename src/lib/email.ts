import { useAppContext } from "@/components/ui/context/AppContext";

interface EmailParams {
  to: string;
  subject: string;
  body: string;
}

export const sendEmail = async ({
  to,
  subject,
  body,
}: EmailParams): Promise<boolean> => {
  try {
    // This is a mock implementation since we don't have a real email service connected
    // In a real implementation, this would use the SMTP settings from AppContext
    // to send an actual email

    console.log("Sending email to:", to);
    console.log("Subject:", subject);
    console.log("Body:", body);

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // In a real implementation with Supabase, you might:
    // 1. Call a Supabase Edge Function that handles email sending
    // 2. Insert a record into an 'emails' table that a background process picks up
    // 3. Use a third-party email API directly from the client (not recommended for production)

    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};

export const sendSms = async (
  to: string,
  message: string,
): Promise<boolean> => {
  try {
    // This is a mock implementation since we don't have a real SMS service connected
    // In a real implementation, this would use Twilio or another SMS provider

    console.log("Sending SMS to:", to);
    console.log("Message:", message);

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return true;
  } catch (error) {
    console.error("Error sending SMS:", error);
    return false;
  }
};

// Helper function to replace template variables
export const replaceTemplateVariables = (
  template: string,
  variables: Record<string, string>,
): string => {
  let result = template;

  for (const [key, value] of Object.entries(variables)) {
    const regex = new RegExp(`{{${key}}}`, "g");
    result = result.replace(regex, value);
  }

  return result;
};
