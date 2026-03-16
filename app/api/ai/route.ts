// The request will go from this service to Python service (Fast API server).
// Refer to the image below:
/*

Next.js (JS)          Python Service
    |                      |
    |  HTTP POST /query     |
    |─────────────────────>|
    |                      | LangChain + Groq
    |                      | fetches docs, builds prompt
    |                      | calls Groq API
    |  JSON response        |
    |<─────────────────────|
    |                      |
Displays answer

*/

// Fast API server on localhost:8000

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){

    const {question} = await req.json();

    const response = await fetch("http://localhost:8000/query",{
        method:"POST",
        headers:{"Content-Type":"application-json"},
        body: JSON.stringify({question})
    });

    const data = await response.json();
    return NextResponse.json({answer:data.answer});
}