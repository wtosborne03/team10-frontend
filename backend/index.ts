// backend/index.ts
import express from 'express';
import * as bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import { register } from './api/auth'; // Import the auth functions

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

// Get all users
app.get('/api/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

app.post('/api/register', register);



// Delete a user
app.delete('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.user.delete({
      where: {
        id: parseInt(id)
      }
    });
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});