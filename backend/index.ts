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


// Update this in your backend/index.ts

app.get('/api/about/stats', async (req, res) => {
  try {
    // Get the about information
    const aboutInfo = await prisma.about.findFirst({
      orderBy: {
        id: 'desc'
      }
    });

    // Get total counts to demonstrate live DB connection
    const [driverUsers, totalSponsors, totalProducts] = await Promise.all([
      // Count users with role 'driver'
      prisma.user.count({
        where: {
          role: 'driver'
        }
      }),
      // Count users with role 'sponsor'
      prisma.user.count({
        where: {
          role: 'sponsor'
        }
      }),
      prisma.productCatalog.count()
    ]);

    res.json({
      about: aboutInfo ?? {
        teamNumber: 10,
        teamName: "Team-10",
        chosenTech: "React Typescript, Postgres",
        sprintNumber: 3
      },
      stats: {
        totalDrivers: driverUsers,
        totalSponsors,
        totalProducts,
        lastUpdated: new Date().toISOString()
      },
      dbConnection: {
        status: 'connected',
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Error fetching about stats:', error);
    res.status(500).json({ 
      error: 'Failed to fetch about stats',
      dbConnection: {
        status: 'error',
        timestamp: new Date().toISOString()
      }
    });
  }
});

app.use(cors({
  origin: 'http://localhost:5173', // Your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});