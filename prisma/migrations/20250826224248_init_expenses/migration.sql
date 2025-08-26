/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `Expense` table. All the data in the column will be lost.
  - You are about to alter the column `amount` on the `Expense` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `DoublePrecision`.

*/
-- DropIndex
DROP INDEX "public"."Expense_clerkUserId_date_idx";

-- AlterTable
ALTER TABLE "public"."Expense" DROP COLUMN "updatedAt",
ALTER COLUMN "amount" SET DATA TYPE DOUBLE PRECISION;
