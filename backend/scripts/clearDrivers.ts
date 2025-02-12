
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function clearDrivers() {
  try {
    await prisma.pointLog.deleteMany({
      where: {
        driver: {
          user: {
            role: 'driver'
          }
        }
      }
    });

    await prisma.purchase.deleteMany({
      where: {
        driver: {
          user: {
            role: 'driver'
          }
        }
      }
    });

    await prisma.driverApplication.deleteMany({
      where: {
        driver: {
          user: {
            role: 'driver'
          }
        }
      }
    });

    await prisma.driver.deleteMany({
      where: {
        user: {
          role: 'driver'
        }
      }
    });

    await prisma.user.deleteMany({
      where: {
        role: 'driver'
      }
    });

    console.log('Successfully cleared all drivers and related data');
  } catch (error) {
    console.error('Error clearing drivers:', error);
  } finally {
    await prisma.$disconnect();
  }
}

clearDrivers();