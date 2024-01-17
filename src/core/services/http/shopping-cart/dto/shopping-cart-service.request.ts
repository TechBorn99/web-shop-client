export interface ShoppingCartItemRequestDTO {
  cartItemUuid: string;
  quantity: number;
}

export interface ShoppingCartItemsUuidsRequestDTO {
  cartItemsUuids: string[];
}

export interface RemoveSingleItemFromShoppingCartRequestDTO {
  cartItemUuid: string;
}
