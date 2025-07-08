import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import type { CropYieldPredictionType, CropYieldPredictionInputType } from '@/types';

export default async function cropYieldPredictionHandler(
  req: NextApiRequest,
  res: NextApiResponse<CropYieldPredictionType[] | CropYieldPredictionType | { error: string }>
) {
  const id = req.query.id ? parseInt(req.query.id as string) : undefined;

  try {
    switch (req.method) {
      case 'GET':
        return res.status(200).json(await prisma.cropYieldPrediction.findMany());
      case 'POST':
        return res.status(201).json(await prisma.cropYieldPrediction.create({ data: req.body as CropYieldPredictionInputType }));
      case 'PUT':
        if (!id) return res.status(400).json({ error: 'Missing ID' });
        return res.status(200).json(await prisma.cropYieldPrediction.update({ where: { id }, data: req.body as CropYieldPredictionInputType }));
      case 'DELETE':
        if (!id) return res.status(400).json({ error: 'Missing ID' });
        return res.status(200).json(await prisma.cropYieldPrediction.delete({ where: { id } }));
      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }
  } catch (error) {
    return res.status(500).json({ error: `Server error: ${(error as Error).message}` });
  }
}
