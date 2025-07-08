import { CropHarvestDetail as PrismaCropHarvestDetail } from '@/generated/prisma';

export type CropHarvestDetailType = PrismaCropHarvestDetail;
export type CropHarvestDetailInputType = Omit<CropHarvestDetailType, 'id'>;
