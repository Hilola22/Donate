export enum PaymnetMethods {
  CLICK = "click",
  CARD = "card",
  PAYME = "payme",
  UZUM = "uzum",
  UZCARD = "uzcard",
  HUMO = "humo",
}

export class CreateDonationDto {
  supporter_id: number;
  creator_id: number;
  amount: number;
  message: string;
  payment_method: PaymnetMethods;
  is_anonymous: boolean;
}
