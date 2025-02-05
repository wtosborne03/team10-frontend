import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function testConnection() {
  try {
    await prisma.$connect()
    console.log('Successfully connected to Aurora PostgreSQL!')
    
    // Test query
    const result = await prisma.$queryRaw`SELECT 1 as test`
    console.log('Test query result:', result)
  } catch (error) {
    console.error('Connection failed:', error)
  } finally {
    await prisma.$disconnect()
  }
}

testConnection()