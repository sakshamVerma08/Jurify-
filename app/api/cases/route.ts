import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/auth-helpers";
import { createCaseSchema } from "@/lib/validators/cases";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    //Authentication and Authorization to allow only logged-in users to create cases.
    const session = await requireAuth(req);
    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const userId = session.user.id;

    //Parse request body
    const body = await req.json();

    //Validate the request body using Zod schema. 
    const parsed = createCaseSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          message: "Validation failed",
          errors: parsed.error.flatten().fieldErrors,
          //.flatten() converts the ZodError into a more readable format with field names as keys and error messages as values,
          // and .fieldErrors specifically extracts the errors related to individual fields.
        },
        { status: 400 }
      );
    }

    const data = parsed.data;///store the validated data in a variable called `data` for easier access later on.

    // Create case in database
    const newCase = await prisma.case.create({
        data: {
            title: data.title,
            description: data.description,

            city: data.city,
            state: data.state,
            country: data.country,

            category: data.category,
            stage: data.stage,

            deadline: data.deadline,
            urgency: data.urgency,
            proBono: data.proBono,

            opposingName: data.opposingName,
            opposingRelationship: data.opposingRelationship,

            postedByUser: userId,
        },
        select: {
            id: true,
            title: true,
        },
    });

    //Return success response with the created case id and title.
    return NextResponse.json(
      {
        message: "Case created successfully",
        case: newCase,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("CASE_CREATION_ERROR:", error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}