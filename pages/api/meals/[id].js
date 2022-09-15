import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handle(req, res) {
    const { id } = req.query
    const meal = await prisma.meal.findUnique({
        where: {
          id: parseInt(id),
        }
      })
    await prisma.$disconnect()
    res.json(meal)
}
