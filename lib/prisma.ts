//Singleton pattern for Prisma Client to prevent multiple instances in development mode, which can lead to connection issues. 
//This is especially important when using serverless environments or hot-reloading during development and prevents the "Error: P1001: Can't reach database server at `localhost`:`5432`" error that occurs when too many connections are opened.
import { PrismaClient } from "@/generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";

// This Prisma Adapter is used with the new Prisma Client in Prisma- v7.
// Also we are using supabase with pooler connection, so Prisma Adapters are needed anyway.
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL_DEVELOPMENT,
});

//globalThis will persist across hot reloads in development, preventing multiple instances of Prisma Client from being created. In production, a new instance will be created as usual.
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}