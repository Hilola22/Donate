export class CreateProductDto {
  name: string;
  description: string;
  in_stock: number;
  price: number;
  is_available: boolean;
  creator_id: number;
  category_id: number;
}
