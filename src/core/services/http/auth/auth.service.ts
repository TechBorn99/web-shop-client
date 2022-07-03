import { AxiosResponse } from 'axios';
import { WebShopApiAuthUrls } from 'utils/constants/api/webshop-api-endpoints.consts';
import BaseHttpService from '../_base/base-http.service';
import {
  ForgotPasswordRequestDTO,
  ResetPasswordRequestDTO,
  SignInRequestDTO,
  SignUpRequestDTO,
} from './dto/auth-service.request.dto';
import {
  ResetPasswordResponseDTO,
  SignInResponseDTO,
  UserDetailsResponseDTO,
} from './dto/auth-service.response.dto';

class AuthService extends BaseHttpService {
  signUp(
    requestDTO: SignUpRequestDTO,
  ): Promise<AxiosResponse<UserDetailsResponseDTO>> {
    return this.http.post(WebShopApiAuthUrls.SignUp, requestDTO, {
      withCredentials: true,
    });
  }

  signIn(
    requestDTO: SignInRequestDTO,
  ): Promise<AxiosResponse<SignInResponseDTO>> {
    return this.http.post(WebShopApiAuthUrls.SignIn, requestDTO, {
      withCredentials: true,
    });
  }

  signOut(): Promise<AxiosResponse> {
    return this.http.get(WebShopApiAuthUrls.SignOut);
  }

  getUserInfo(): Promise<AxiosResponse<UserDetailsResponseDTO>> {
    return this.http.post(WebShopApiAuthUrls.UserInfo);
  }

  forgotPassword(requestDTO: ForgotPasswordRequestDTO): Promise<AxiosResponse> {
    return this.http.post(WebShopApiAuthUrls.ForgotPassword, requestDTO, {
      withCredentials: true,
    });
  }

  resetPassword(
    requestDTO: ResetPasswordRequestDTO,
  ): Promise<AxiosResponse<ResetPasswordResponseDTO>> {
    return this.http.put(WebShopApiAuthUrls.ResetPassword, requestDTO, {
      withCredentials: true,
    });
  }
}

export default new AuthService();
