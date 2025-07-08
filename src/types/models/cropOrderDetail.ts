import { CropOrderDetail as PrismaCropOrderDetail } from '@/generated/prisma';

export type CropOrderDetailType = PrismaCropOrderDetail;
export type CropOrderDetailInputType = Omit<CropOrderDetailType, 'id'>;
