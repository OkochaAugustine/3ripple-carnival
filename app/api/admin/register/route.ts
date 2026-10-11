import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Admin from "@/models/Admin";
import { hashPassword, generateToken } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Validate password strength (minimum 8 characters)
    if (password.length < 8) {
      return NextResponse.json(
        { success: false, error: "Password must be at least 8 characters long" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // Check if an admin already exists (only allow one admin account)
    const existingAdminCount = await Admin.countDocuments();
    if (existingAdminCount > 0) {
      return NextResponse.json(
        { success: false, error: "An admin account already exists. Please use the login page." },
        { status: 403 }
      );
    }

    // Check if email is already taken (shouldn't happen with count check, but double-check)
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return NextResponse.json(
        { success: false, error: "An admin with this email already exists" },
        { status: 409 }
      );
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create the admin
    const admin = await Admin.create({
      email,
      password: hashedPassword,
    });

    // Generate authentication token
    const token = generateToken({ email: admin.email });

    const response = NextResponse.json(
      { success: true, message: "Admin account created successfully" },
      { status: 201 }
    );

    // Set the authentication cookie
    response.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 86400,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Admin registration error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create admin account. Please try again." },
      { status: 500 }
    );
  }
}
