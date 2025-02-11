import { PrismaClient, type Prisma } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';


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
        role: req.body.role || 'driver',
        passwordHash: hashedPassword,
      } satisfies Prisma.UserCreateInput,
    });
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '24h' });
    res.status(201).json({ success: true, token });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(400).json({ error: 'Registration failed' });
  }
}

export async function login(req: AuthRequest, res: Response) {
  try {
    const user = await prisma.user.findUnique({
      where: { email: req.body.email },
    });
    if (!user || !(await bcrypt.compare(req.body.password, user.passwordHash))) {
      console.error('Invalid email or password');
      res.status(401).json({ error: 'Invalid email or password' });
      return;
    }
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '24h' });
    res.status(200).json({ success: true, token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(400).json({ error: 'Login failed' });
  }
}