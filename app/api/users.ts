// app/api/users.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getUsers() {
  try {
    return await prisma.user.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
  } catch (error) {
    console.error('Error getting users:', error);
    throw error;
  }
}

export async function createUser(name: string, email: string) {
  try {
    return await prisma.user.create({
      data: {
        name,
        email,
      }
    });
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}