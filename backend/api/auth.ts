import { PrismaClient, type Prisma } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { CognitoIdentityServiceProvider } from 'aws-sdk';


const prisma = new PrismaClient();
export const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

const cognito = new CognitoIdentityServiceProvider();
const USER_POOL_ID = process.env.COGNITO_USER_POOL_ID;
const CLIENT_ID = process.env.COGNITO_CLIENT_ID;


interface AuthRequest extends Request {
  body: {
    name: string;
    email: string;
    password: string;
    role: 'driver' | 'sponsor' | 'admin';
  }
}

export async function register(req: AuthRequest, res: Response) {
  const { name, email, password, role } = req.body;
  const params: CognitoIdentityServiceProvider.Types.SignUpRequest = {
    ClientId: CLIENT_ID!,
    Username: email,
    Password: password,
    UserAttributes: [
      { Name: 'name', Value: name },
      { Name: 'email', Value: email },
    ],
  };

  try {
    const signUpResponse = await cognito.signUp(params).promise();
    const cognitoUserId = signUpResponse.UserSub;

    const user = await prisma.user.create({
      data: {
        id: cognitoUserId,
        name,
        email,
        role,
      }
    });

    res.status(201).json({ success: true, message: 'User registered successfully' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(400).json({ error: 'Registration failed' });
  }
}
