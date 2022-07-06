import { BaseDTO } from '../../_base/dto/base-service.response.dto';

export enum Roles {
  WebShopAdministrator = 'WEBSHOP_ADMINISTRATOR',
  WebShopCustomer = 'WEBSHOP_CUSTOMER',
  WebShopSeller = 'WEBSHOP_SELLER',
}

export interface UserDetailsResponseDTO extends BaseDTO {
  email: string;
  firstName: string;
  lastName: string;
  role: RoleResponseDTO;
  shoppingCartUuid;
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
