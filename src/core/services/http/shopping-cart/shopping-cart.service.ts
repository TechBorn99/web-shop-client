import { AxiosResponse } from 'axios';
import { WebShopApiShoppingCartUrl } from 'utils/constants/api/webshop-api-endpoints.consts';
import BaseHttpService from '../_base/base-http.service';
import { ShoppingCartItemRequestDTO } from './dto/shopping-cart-service.request';
import { ShoppingCartResponseDTO } from './dto/shopping-cart-service.response';

class ShoppingCartService extends BaseHttpService {
  addAProduct(
    requestDTO: ShoppingCartItemRequestDTO,
    uuid: string,
  ): Promise<AxiosResponse<ShoppingCartResponseDTO>> {
    return this.http.post(
      WebShopApiShoppingCartUrl.AddAnItem(uuid),
      requestDTO,
    );
  }
}

export default new ShoppingCartService();
