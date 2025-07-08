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
        const farmers = await prisma.farmer.findMany();
        return res.status(200).json(farmers);
      }

      case 'POST': {
        return res.status(201).json(await prisma.farmer.create({ data: req.body as FarmerInputType }));
      }

      case 'PUT': {
        if (!id) return res.status(400).json({ error: 'Missing ID' });
        return res.status(200).json(await prisma.farmer.update({ where: { id }, data: req.body as FarmerInputType }));
      }

      case 'DELETE': {
        if (!id) return res.status(400).json({ error: 'Missing ID' });
        return res.status(200).json(await prisma.farmer.delete({ where: { id } }));
      }

      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }
  } catch (error) {
    return res.status(500).json({ error: `Server error: ${(error as Error).message}` });
  }
}
