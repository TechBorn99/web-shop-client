export interface ChargeCardResponseDTO {}

export interface PaymentResponseDTO {
  amount: number;
  balanceTransaction: string;
  currency: string;
  sellerMessage: string;
  paid: boolean;
  billedUserEmail: string;
}
