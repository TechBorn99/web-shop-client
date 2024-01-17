import { BaseDTO } from '../../_base/dto/base-service.response.dto';

export enum Roles {
  WebShopAdmin = 'WEBSHOP_ADMIN',
  WebShopCustomer = 'WEBSHOP_CUSTOMER',
  WebShopSeller = 'WEBSHOP_SELLER',
}

interface UserShoppingCart {
  uuid: string;
}

export interface UserDetailsResponseDTO extends BaseDTO {
  email: string;
  firstName: string;
  lastName: string;
  role: RoleResponseDTO;
}

export interface RoleResponseDTO {
  name: Roles;
}

export interface SignInResponseDTO {
  token: string;
  account: UserDetailsResponseDTO;
}

export interface ResetPasswordResponseDTO {
  token: string;
}

export interface RefreshAccessTokenResponseDTO {
  accessToken: string;
}
