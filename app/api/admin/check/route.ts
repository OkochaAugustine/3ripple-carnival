import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Admin from "@/models/Admin";

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();

    const adminCount = await Admin.countDocuments();

    return NextResponse.json(
      { success: true, hasAdmin: adminCount > 0 },
      { status: 200 }
    );
  } catch (error) {
    console.error("Admin check error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to check admin status" },
      { status: 500 }
    );
  }
}
