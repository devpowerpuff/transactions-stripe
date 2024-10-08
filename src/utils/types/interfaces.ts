export interface IPolicy {
  id: string;
  underwritingDetailsId: string;
  quoteId: string;
  status: string;
  chargeId?: string;
  amount?: number;
  currency?: string;
  receiptUrl?: string;
  balanceTransactionId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PolicyProps {
  status: string;
  quoteId: string;
  underwritingDetailsId: string;
  chargeId: string;
  amount: number;
  currency: string;
}

export interface RefundFormProps {
  policy: IPolicy;
  cancelRefund: () => void;
  onRefundComplete: () => void;
}
