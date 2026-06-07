-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('PSICOLOGO', 'PACIENTE');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "tipo" "UserType" NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "crp" TEXT,
    "especialidade" TEXT,
    "abordagem" TEXT,
    "data_nascimento" TIMESTAMP(3),
    "profissao" TEXT,
    "contato" TEXT,
    "contato_emergencia" TEXT,
    "observacoes" TEXT,
    "psicologo_id" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_cpf_key" ON "users"("cpf");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_psicologo_id_fkey" FOREIGN KEY ("psicologo_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
