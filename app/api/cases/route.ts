import { requireAuth } from "@/lib/auth/auth-helpers";
import { NextResponse } from "next/server";
export async function POST(req:Request){
    const session = await requireAuth(req);
    if (!session) {
        return NextResponse.json(
            { message: "Unauthorized" },
            { status: 401 }
        );
    }
    //Write down the logic to create a new case here.
}