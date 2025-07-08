import { Veggie as PrismaVeggie } from '@/generated/prisma';

export type VeggieType = PrismaVeggie;
export type VeggieInputType = Omit<VeggieType, 'id'>;
