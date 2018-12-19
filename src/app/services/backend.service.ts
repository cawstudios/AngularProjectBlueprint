import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class BackendService {

  baseUrl: string;

  constructor(private readonly httpClient: HttpClient) {
    this.baseUrl = environment.apiBaseUrl;
  }

  async get(url: string): Promise<any> {
    return this.httpClient.get(this.baseUrl + url, {responseType: 'json'}).toPromise();
  }

  async post(url: string, body: any): Promise<any> {
    return this.httpClient.post(this.baseUrl + url, body, {responseType: 'json'}).toPromise();
  }

  async put(url: string, body: any): Promise<any> {
    return this.httpClient.put(this.baseUrl + url, body, {responseType: 'json'}).toPromise();
  }

}
