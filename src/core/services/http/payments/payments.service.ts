import { AxiosResponse } from 'axios';
import { WebShopApiPaymentUrls } from 'utils/constants/api/webshop-api-endpoints.consts';
import BaseHttpService from '../_base/base-http.service';
import { ChargeCardRequestDTO } from './dto/payments-service.request.dto';
import {
  ChargeCardResponseDTO,
  PaymentResponseDTO,
} from './dto/payments-service.response.dto';

class PaymentService extends BaseHttpService {
  charge(
    requestDTO: ChargeCardRequestDTO,
  ): Promise<AxiosResponse<ChargeCardResponseDTO>> {
    return this.http.post(WebShopApiPaymentUrls.Charge, requestDTO);
  }

  getAllPayment(): Promise<AxiosResponse<PaymentResponseDTO[]>> {
    return this.http.get(WebShopApiPaymentUrls.GetAllPayments);
  }
}

export default new PaymentService();
