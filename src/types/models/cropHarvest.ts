import { CropHarvest as PrismaCropHarvest } from '@/generated/prisma';

export type CropHarvestType = PrismaCropHarvest;
export type CropHarvestInputType = Omit<CropHarvestType, 'id'>;
