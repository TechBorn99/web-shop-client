import { AxiosInstance } from 'axios';
import http from 'core/http-client/http-client';

export default class BaseHttpService {
  protected http: AxiosInstance;

  constructor() {
    this.http = http;
  }
}
