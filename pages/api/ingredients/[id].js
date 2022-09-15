import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handle(req, res) {
    const { method } = req
    const { id } = req.query
    const ingredient = await prisma.ingredient.findUnique({
        where: {
          id: parseInt(id),
        }
    })
    await prisma.$disconnect()
    res.json(ingredient)
}
