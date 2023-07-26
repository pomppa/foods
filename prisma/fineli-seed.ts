import prisma from '../lib/prisma';
import fs from 'fs';
import path from 'path';

async function main() {
  try {
    const sqlFilePath = path.join(__dirname, 'fineli-data.sql');
    const sql = fs.readFileSync(sqlFilePath, 'utf8');

    const result = await prisma.$queryRawUnsafe(sql);
    console.log('Seed script executed successfully:', result);
  } catch (error) {
    console.error('Error executing seed script:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error('Unhandled error during seed script execution:', error);
});
