import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import type { FarmerType, FarmerInputType } from '@/types';

export default async function farmerHandler(
  req: NextApiRequest,
  res: NextApiResponse<FarmerType[] | FarmerType | { error: string }>
) {
  const id = req.query.id ? parseInt(req.query.id as string) : undefined;

  try {
    switch (req.method) {
      case 'GET': {
        if (id) {
          const farmer = await prisma.farmer.findUnique({ where: { id } });

          if (!farmer) {
            return res.status(404).json({ error: 'Farmer not found' });
          }
          
          return res.status(200).json(farmer);
        }
        const farmers = await prisma.farmer.findMany({orderBy: {id: 'asc'}});
        return res.status(200).json(farmers);
      }

      case 'POST': {
        const farmer = await prisma.farmer.create({
          data: req.body as FarmerInputType,
        });

        return res.status(201).json(farmer);
      }

      case 'PUT': {
        if (!id) {
          return res.status(400).json({ error: 'Missing ID' });
        }

        const updated = await prisma.farmer.update({
          where: { id },
          data: req.body as FarmerInputType,
        });

        return res.status(200).json(updated);
      }

      case 'DELETE': {
        if (!id) {
          return res.status(400).json({ error: 'Missing ID' });
        }

        const deleted = await prisma.farmer.delete({
          where: { id },
        });

        return res.status(200).json(deleted);
      }

      default: {
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        return res
          .status(405)
          .json({ error: `Method ${req.method} Not Allowed` });
      }
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Server error: ${(error as Error).message}` });
  }
}
