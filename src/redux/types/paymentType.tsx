export type orderData = {
  success: boolean;
  message: string;
  userId: string;
  orderId: string;
  amount: number;
  currency: string;
  receipt: string;
  status: string;
  notes?: {
    name?: string;
  };
  paymentId?: string;
  // Allow additional fields like _id, createdAt, updatedAt without typing them
  [key: string]: any;
};

interface order {
  isOrderLoading: boolean | null;
  orderData: orderData | null;
  isOrderError: boolean | null;
}

export interface Payment {
  order: order;
}
