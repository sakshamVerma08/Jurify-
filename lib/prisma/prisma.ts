//Singleton pattern for Prisma Client to prevent multiple instances in development mode, which can lead to connection issues. 
//This is especially important when using serverless environments or hot-reloading during development and prevents the "Error: P1001: Can't reach database server at `localhost`:`5432`" error that occurs when too many connections are opened.
import { PrismaClient } from "@/generated/prisma";
//Imports the PostgreSQL driver adapter. Prisma needs this to talk to Postgres using the newer driver adapters pattern instead of the older binary query engine.
import { PrismaPg } from "@prisma/adapter-pg";

// Casts globalThis (the global object that persists across hot reloads) 
// to a typed shape that can optionally hold a PrismaClient. 
// The ? means it starts as undefined. This is the foundation of the singleton — a place to stash the instance that survives file re-execution.
const globalForPrisma = globalThis as {
    prisma?: PrismaClient;
};

//If the singleton already exists, this never runs, so no wasted connections or adapters.
function createPrismaClient() {
    const connectionString = process.env.DATABASE_URL;

    if (!connectionString) {
        throw new Error("DATABASE_URL is not defined");
    }
    // This Prisma Adapter is used with the new Prisma Client in Prisma- v7.
    // Also we are using supabase with pooler connection, so Prisma Adapters are needed anyway.
    //This is what prisma uses under the hood to actually open connections to our supabase database.
    const adapter = new PrismaPg({
        connectionString,
    });

    //Log level is ["error","warn"] in dev so we can see warnings in dev but only ["error"] in production to keep logs clean.
    return new PrismaClient({
        adapter,
        log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
    });
}

//The core of the singleton.It checks if a client already exists on globalThis.
//If yes, reuse it and if no then create one using createPrismaClient() - so on hot 
//reload during the development,the old client is reused and no extra adapters or connections are created.
export const prisma =
    globalForPrisma.prisma ??
    createPrismaClient();

// Stores the client on globalThis, but only in development.
// This is what makes the singleton actually work across hot reloads — next time this file re-executes, globalForPrisma.prisma is already set. 
// In production this line is skipped entirely because serverless functions have process isolation and don't need it — each cold start gets a fresh client naturally.
if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}