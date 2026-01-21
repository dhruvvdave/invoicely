import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => new PrismaClient()

declare global {
  var prismaGlobal: PrismaClient | undefined
}

const prisma = process.env.DATABASE_URL
  ? (globalThis.prismaGlobal ?? prismaClientSingleton())
  : null

export default prisma

if (process.env.NODE_ENV !== 'production' && prisma) {
  globalThis.prismaGlobal = prisma
}
