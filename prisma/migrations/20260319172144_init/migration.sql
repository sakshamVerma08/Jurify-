-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'LAWYER');

-- CreateEnum
CREATE TYPE "VerificationType" AS ENUM ('IDENTITY', 'BAR_LICENSE', 'EMAIL', 'PHONE', 'EDUCATION');

-- CreateEnum
CREATE TYPE "VerificationStatus" AS ENUM ('PENDING', 'VERIFIED', 'REJECTED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "CaseCategory" AS ENUM ('FAMILY_LAW', 'CRIMINAL_LAW', 'CIVIL_LAW', 'CORPORATE_LAW', 'PROPERTY_LAW', 'LABOR_LAW', 'TAX_LAW', 'INTELLECTUAL_PROPERTY_LAW', 'CONSTITUTIONAL_LAW', 'ENVIRONMENTAL_LAW', 'IMMIGRATION_LAW', 'BANKING_LAW', 'CYBER_LAW');

-- CreateEnum
CREATE TYPE "CaseStage" AS ENUM ('INITIAL_CONSULTATION', 'INVESTIGATION', 'FILING', 'HEARING', 'TRIAL', 'JUDGMENT', 'APPEAL', 'CLOSED');

-- CreateEnum
CREATE TYPE "ConnectionStatus" AS ENUM ('PENDING', 'ACCEPTED', 'DECLINED', 'BLOCKED');

-- CreateEnum
CREATE TYPE "Urgency" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL');

-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('SUBMITTED', 'UNDER_REVIEW', 'ACCEPTED', 'REJECTED', 'WITHDRAWN');

-- CreateEnum
CREATE TYPE "MessageRole" AS ENUM ('USER', 'LAWYER');

-- CreateEnum
CREATE TYPE "Visibility" AS ENUM ('PUBLIC', 'UNLISTED', 'PRIVATE');

-- CreateEnum
CREATE TYPE "PostStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phoneNo" TEXT,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "image" TEXT,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LawyerProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT,
    "bio" TEXT,
    "location" TEXT,
    "barNumber" TEXT,
    "barCouncil" TEXT,
    "yearsOfExperience" INTEGER DEFAULT 0,
    "caseCount" INTEGER DEFAULT 0,
    "hourlyRate" INTEGER,
    "isAvailableForProBono" BOOLEAN NOT NULL DEFAULT true,
    "website" TEXT,
    "linkedinUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LawyerProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Case" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "city" VARCHAR(100) NOT NULL,
    "state" VARCHAR(100) NOT NULL,
    "country" VARCHAR(100) NOT NULL DEFAULT 'India',
    "postedByUser" TEXT NOT NULL,
    "category" "CaseCategory" NOT NULL,
    "stage" "CaseStage" NOT NULL DEFAULT 'INITIAL_CONSULTATION',
    "deadline" TIMESTAMP(3),
    "urgency" "Urgency" NOT NULL DEFAULT 'MEDIUM',
    "proBono" BOOLEAN NOT NULL DEFAULT false,
    "opposingName" VARCHAR(100),
    "opposingRelationship" VARCHAR(100),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Case_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "session" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "accessToken" TEXT,
    "idToken" TEXT,
    "refreshToken" TEXT,
    "accessTokenExpiresAt" TIMESTAMP(3),
    "scope" TEXT,
    "password" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verification" (
    "id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "verification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "LawyerProfile_userId_key" ON "LawyerProfile"("userId");

-- CreateIndex
CREATE INDEX "LawyerProfile_yearsOfExperience_idx" ON "LawyerProfile"("yearsOfExperience");

-- CreateIndex
CREATE INDEX "LawyerProfile_isAvailableForProBono_idx" ON "LawyerProfile"("isAvailableForProBono");

-- CreateIndex
CREATE INDEX "Case_postedByUser_idx" ON "Case"("postedByUser");

-- CreateIndex
CREATE INDEX "Case_category_idx" ON "Case"("category");

-- CreateIndex
CREATE INDEX "Case_stage_idx" ON "Case"("stage");

-- CreateIndex
CREATE INDEX "Case_deletedAt_idx" ON "Case"("deletedAt");

-- CreateIndex
CREATE INDEX "Case_city_state_idx" ON "Case"("city", "state");

-- CreateIndex
CREATE INDEX "Case_state_category_idx" ON "Case"("state", "category");

-- CreateIndex
CREATE INDEX "Case_category_stage_idx" ON "Case"("category", "stage");

-- CreateIndex
CREATE INDEX "Case_proBono_idx" ON "Case"("proBono");

-- CreateIndex
CREATE INDEX "Case_deletedAt_category_idx" ON "Case"("deletedAt", "category");

-- CreateIndex
CREATE INDEX "Case_createdAt_idx" ON "Case"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "session_token_key" ON "session"("token");

-- CreateIndex
CREATE INDEX "account_userId_idx" ON "account"("userId");

-- CreateIndex
CREATE INDEX "account_providerId_idx" ON "account"("providerId");

-- AddForeignKey
ALTER TABLE "LawyerProfile" ADD CONSTRAINT "LawyerProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Case" ADD CONSTRAINT "Case_postedByUser_fkey" FOREIGN KEY ("postedByUser") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
