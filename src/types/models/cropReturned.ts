import { CropReturned as PrismaCropReturned } from '@/generated/prisma';

export type CropReturnedType = PrismaCropReturned;
export type CropReturnedInputType = Omit<CropReturnedType, 'id'>;
