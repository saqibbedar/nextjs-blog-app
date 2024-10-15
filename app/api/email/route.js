import { connectToDatabase } from "@/lib/config/db";
import EmailModel from "@/lib/models/EmailModel";
import "dotenv/config";
import { NextResponse } from "next/server";

// connect to mongodb
const LoadDatabase = async () => {
  await connectToDatabase(`${process.env.MONGODB_URL}/blog-app`);
};

LoadDatabase();

// api endpoint for email subscription
export async function POST(request) {
  try {
    const formData = await request.formData();
    const emailData = {
      email: `${formData.get("email")}`,
    };
    await EmailModel.create(emailData);
    return NextResponse.json({
      success: true,
      message: "Email Subscribed",
    });
  } catch (error) {
    console.error("Email subscription error: ", error);
    return NextResponse.json({
      success: false,
      message: "Error while subscribing email",
    });
  }
}

// api endpoint for email list
export async function GET(request) {
  const emails = await EmailModel.find({});
  return NextResponse.json({ success: true, emails });
}

// api endpoint for email deletion
export async function DELETE(request) {
  try {
    const id = request.nextUrl.searchParams.get("id");
    await EmailModel.findByIdAndDelete(id);
    return NextResponse.json({
      success: true,
      message: "Email deleted successfully",
    });
  } catch (error) {
    console.error("Email deletion error: ", error);
    return NextResponse.json({
      success: false,
      message: "Error while deleting email",
    });
  }
}
