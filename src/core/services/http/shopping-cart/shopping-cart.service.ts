import { AxiosResponse } from 'axios';
import { WebShopApiShoppingCartUrl } from 'utils/constants/api/webshop-api-endpoints.consts';
import { ProductResponseDTO } from '../products/dto/product-service.response.dto';
import BaseHttpService from '../_base/base-http.service';
import {
  RemoveSingleItemFromShoppingCartRequestDTO,
  ShoppingCartItemRequestDTO,
  ShoppingCartItemsUuidsRequestDTO,
} from './dto/shopping-cart-service.request';
import { ShoppingCartResponseDTO } from './dto/shopping-cart-service.response';

class ShoppingCartService extends BaseHttpService {
  addAProduct(
    requestDTO: ShoppingCartItemRequestDTO,
  ): Promise<AxiosResponse<ShoppingCartResponseDTO>> {
    return this.http.post(WebShopApiShoppingCartUrl.AddAnItem, requestDTO);
  }

  getItemsByUuids(
    requestDTO: ShoppingCartItemsUuidsRequestDTO,
  ): Promise<AxiosResponse<ProductResponseDTO[]>> {
    return this.http.post(WebShopApiShoppingCartUrl.GetByUuids, requestDTO);
  }

  getShoppingCart(): Promise<AxiosResponse<ShoppingCartResponseDTO>> {
    return this.http.get(WebShopApiShoppingCartUrl.GetShoppingCart);
  }

  removeSingleProduct(
    requestDTO: RemoveSingleItemFromShoppingCartRequestDTO,
  ): Promise<AxiosResponse<ShoppingCartResponseDTO>> {
    return this.http.delete(
      WebShopApiShoppingCartUrl.RemoveSingleItem(requestDTO.cartItemUuid),
    );
  }
}

export default new ShoppingCartService();
