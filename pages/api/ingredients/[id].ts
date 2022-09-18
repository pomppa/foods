import prisma from '../../../lib/prisma';

export default async function handle(req, res) {
    const ingredient = await prisma.ingredient.findUnique({
        where: {
          id: Number(req.query.id),
        }
    })
    res.json(ingredient)
}
