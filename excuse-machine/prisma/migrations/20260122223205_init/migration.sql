-- CreateTable
CREATE TABLE "excuses" (
    "id" TEXT NOT NULL,
    "excuse_text" TEXT NOT NULL,
    "votes" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "excuses_pkey" PRIMARY KEY ("id")
);
