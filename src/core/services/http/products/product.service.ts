import { AxiosResponse } from 'axios';
import { WebShopApiProductUrl } from 'utils/constants/api/webshop-api-endpoints.consts';
import BaseHttpService from '../_base/base-http.service';
import { GetProductPageWithFiltersRequestDTO } from './dto/product-service.request.dto';
import { ProductPageResponseDTO } from './dto/product-service.response.dto';

class ProductService extends BaseHttpService {
  getPageProductWithFilters(
    requestDTO: GetProductPageWithFiltersRequestDTO,
  ): Promise<AxiosResponse<ProductPageResponseDTO>> {
    return this.http.post(WebShopApiProductUrl.GetProductPage, requestDTO);
  }
}

export default new ProductService();
