import { Farmer as PrismaFarmer } from '@/generated/prisma';

export type FarmerType = PrismaFarmer;
export type FarmerInputType = Omit<FarmerType, 'id'>;
