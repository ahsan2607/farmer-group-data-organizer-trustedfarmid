import { CropReturnedDetail as PrismaCropReturnedDetail } from '@/generated/prisma';

export type CropReturnedDetailType = PrismaCropReturnedDetail;
export type CropReturnedDetailInputType = Omit<CropReturnedDetailType, 'id'>;
