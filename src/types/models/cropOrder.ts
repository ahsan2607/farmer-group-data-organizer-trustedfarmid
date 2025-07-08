import { CropOrder as PrismaCropOrder } from '@/generated/prisma';

export type CropOrderType = PrismaCropOrder;
export type CropOrderInputType = Omit<CropOrderType, 'id'>;
