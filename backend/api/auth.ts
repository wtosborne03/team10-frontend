import { PrismaClient, type Prisma } from '@prisma/client';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

interface AuthRequest extends Request {
 body: {
   name: string;
   email: string;
   password: string;
   role: 'driver' | 'sponsor' | 'admin';
 }
}

export async function register(req: AuthRequest, res: Response) {
 try {
   const hashedPassword = await bcrypt.hash(req.body.password, 10);
   const user = await prisma.user.create({
     data: {
       name: req.body.name,
       email: req.body.email,
       role: req.body.role,
       passwordHash: hashedPassword
     } satisfies Prisma.UserCreateInput
   });
   res.status(201).json({ success: true });
 } catch (error) {
   res.status(400).json({ error: 'Registration failed' });
 }
}