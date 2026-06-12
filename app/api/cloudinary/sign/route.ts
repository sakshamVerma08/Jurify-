import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/auth-helper";

// Configure Cloudinary server-side SDK using environment variables
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function POST(req: Request) {
  try {
    // 1. Verify Authentication
    // Only authenticated users (Lawyers performing KYC, Clients posting case docs, etc.)
    // should be able to sign upload requests.
    const session = await requireAuth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    // 2. Parse the request body
    const body = await req.json();
    const { paramsToSign } = body;

    if (!paramsToSign) {
      return NextResponse.json({ error: "Missing parameters to sign" }, { status: 400 });
    }

    // 3. Generate the cryptographic signature using Cloudinary SDK
    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      process.env.CLOUDINARY_API_SECRET as string
    );

    // 4. Return the secure signature back to the client
    return NextResponse.json({ signature });
  } catch (error) {
    console.error("[CLOUDINARY_SIGN_ERROR] Error signing request:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
