import { UserDetailsResponseDTO } from '../../auth/dto/auth-service.response.dto';
import { ProductResponseDTO } from '../../products/dto/product-service.response.dto';

export interface WebShopCustomerResponseDTO {
  uuid: string;
  account: UserDetailsResponseDTO;
}

export interface ShoppingCartItemResponseDTO {
  quantity: number;
  product: ProductResponseDTO;
  totalPrice: number;
}

export interface ShoppingCartResponseDTO {
  uuid: string;
  customer: WebShopCustomerResponseDTO;
  cartItems: ShoppingCartItemResponseDTO[];
  totalPrice: number;
}
