import Registration from "@/models/Registration";

const YEAR = "2026";
const PREFIX = "DFC";

export function generateRegistrationCode(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `${PREFIX}-${YEAR}-${code}`;
}

export async function getUniqueRegistrationCode(): Promise<string> {
  let code: string;
  let isUnique = false;
  let attempts = 0;
  const maxAttempts = 10;

  while (!isUnique && attempts < maxAttempts) {
    code = generateRegistrationCode();
    const existing = await Registration.findOne({ registrationCode: code });
    if (!existing) {
      isUnique = true;
      return code;
    }
    attempts++;
  }

  throw new Error("Failed to generate unique registration code after multiple attempts");
}
