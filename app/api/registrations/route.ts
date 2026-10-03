import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Registration from "@/models/Registration";
import { getUniqueRegistrationCode } from "@/lib/registration-code";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, email, phone, address } = body;

    if (!fullName || !email || !phone || !address) {
      return NextResponse.json(
        { success: false, error: "All fields are required" },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email address" },
        { status: 400 }
      );
    }

    if (!isValidPhone(phone)) {
      return NextResponse.json(
        { success: false, error: "Invalid phone number" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const existingRegistration = await Registration.findOne({ email: email.toLowerCase() });
    if (existingRegistration) {
      return NextResponse.json(
        { success: false, error: "This email address is already registered" },
        { status: 409 }
      );
    }

    const registrationCode = await getUniqueRegistrationCode();

    const registration = await Registration.create({
      fullName: fullName.trim(),
      email: email.toLowerCase().trim(),
      phone: phone.trim(),
      address: address.trim(),
      registrationCode,
      registeredAt: new Date(),
    });

    return NextResponse.json(
      {
        success: true,
        registrationCode,
        registration: {
          fullName: registration.fullName,
          email: registration.email,
          phone: registration.phone,
          address: registration.address,
          registeredAt: registration.registeredAt,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to register. Please try again." },
      { status: 500 }
    );
  }
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, "").length >= 10;
}
