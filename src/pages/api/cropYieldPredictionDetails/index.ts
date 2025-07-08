import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import type { CropYieldPredictionDetailType, CropYieldPredictionDetailInputType } from '@/types';

export default async function cropYieldPredictionDetailHandler(
  req: NextApiRequest,
  res: NextApiResponse<CropYieldPredictionDetailType[] | CropYieldPredictionDetailType | { error: string }>
) {
  const id = req.query.id ? parseInt(req.query.id as string) : undefined;

  try {
    switch (req.method) {
      case 'GET':
        return res.status(200).json(await prisma.cropYieldPredictionDetail.findMany());
      case 'POST':
        return res.status(201).json(await prisma.cropYieldPredictionDetail.create({ data: req.body as CropYieldPredictionDetailInputType }));
      case 'PUT':
        if (!id) return res.status(400).json({ error: 'Missing ID' });
        return res.status(200).json(await prisma.cropYieldPredictionDetail.update({ where: { id }, data: req.body as CropYieldPredictionDetailInputType }));
      case 'DELETE':
        if (!id) return res.status(400).json({ error: 'Missing ID' });
        return res.status(200).json(await prisma.cropYieldPredictionDetail.delete({ where: { id } }));
      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }
  } catch (error) {
    return res.status(500).json({ error: `Server error: ${(error as Error).message}` });
  }
}
