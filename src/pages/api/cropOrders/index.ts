import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import type { CropOrderType, CropOrderInputType } from '@/types';

export default async function cropOrderHandler(
  req: NextApiRequest,
  res: NextApiResponse<CropOrderType[] | CropOrderType | { error: string }>
) {
  const id = req.query.id ? parseInt(req.query.id as string) : undefined;

  try {
    switch (req.method) {
      case 'GET':
        if (id) {
          const cropOrder = await prisma.cropOrder.findUnique({ where: { id } });

          if (!cropOrder) {
            return res.status(404).json({ error: 'Crop order not found' });
          }

          return res.status(200).json(cropOrder);
        }
        return res.status(200).json(await prisma.cropOrder.findMany());
      case 'POST':
        return res.status(201).json(await prisma.cropOrder.create({ data: req.body as CropOrderInputType }));
      case 'PUT':
        if (!id) return res.status(400).json({ error: 'Missing ID' });
        return res.status(200).json(await prisma.cropOrder.update({ where: { id }, data: req.body as CropOrderInputType }));
      case 'DELETE':
        if (!id) return res.status(400).json({ error: 'Missing ID' });
        return res.status(200).json(await prisma.cropOrder.delete({ where: { id } }));
      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }
  } catch (error) {
    return res.status(500).json({ error: `Server error: ${(error as Error).message}` });
  }
}
