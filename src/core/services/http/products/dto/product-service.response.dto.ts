import { UserDetailsResponseDTO } from '../../auth/dto/auth-service.response.dto';
import { Paged } from '../../_base/dto/base-service.response.dto';

export interface WebShopSellerResponseDTO {
  uuid: string;
  account: UserDetailsResponseDTO;
}

export interface ProductResponseDTO {
  uuid: string;
  name: string;
  description: string;
  seller: WebShopSellerResponseDTO;
  isAvailable: boolean;
  price: number;
  createdAt: string;
}

export interface ProductPageResponseDTO {
  totalElements: number;
  productPage: Paged<ProductResponseDTO>;
}
