export interface CartItemRequestDTO {
  uuid: string;
  name: string;
  description: string;
  price: number;
}

export interface ShoppingCartItemRequestDTO {
  cartItem: CartItemRequestDTO;
  quantity: number;
}
