import { AxiosResponse } from 'axios';
import { WebShopApiProductUrl } from 'utils/constants/api/webshop-api-endpoints.consts';
import BaseHttpService from '../_base/base-http.service';
import { GetProductPageWithFiltersRequestDTO } from './dto/product-service.request.dto';
import {
  ProductPageResponseDTO,
  ProductResponseDTO,
} from './dto/product-service.response.dto';

class ProductService extends BaseHttpService {
  getPageProductWithFilters(
    requestDTO: GetProductPageWithFiltersRequestDTO,
  ): Promise<AxiosResponse<ProductPageResponseDTO>> {
    return this.http.post(WebShopApiProductUrl.GetProductPage, requestDTO);
  }

  makeProductAvailable(
    productUuid: string,
  ): Promise<AxiosResponse<ProductResponseDTO>> {
    return this.http.put(
      WebShopApiProductUrl.MakeProductAvailable(productUuid),
    );
  }

  makeProductUnavailable(
    productUuid: string,
  ): Promise<AxiosResponse<ProductResponseDTO>> {
    return this.http.put(
      WebShopApiProductUrl.MakeProductUnavailable(productUuid),
    );
  }

  softDeleteProduct(productUuid: string): Promise<AxiosResponse<void>> {
    return this.http.delete(
      WebShopApiProductUrl.SoftDeleteProduct(productUuid),
    );
  }
}

export default new ProductService();
