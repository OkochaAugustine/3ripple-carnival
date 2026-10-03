import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Registration from "@/models/Registration";
import { verifyToken } from "@/lib/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  try {
    const { code } = await params;
    const token = request.cookies.get("admin_token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json(
        { success: false, error: "Invalid or expired token" },
        { status: 401 }
      );
    }

    await connectToDatabase();

    const registration = await Registration.findOne({
      registrationCode: code,
    }).select("-_id -__v");

    if (!registration) {
      return NextResponse.json(
        { success: false, error: "Registration not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        registration,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Admin registration details fetch error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch registration details" },
      { status: 500 }
    );
  }
}
