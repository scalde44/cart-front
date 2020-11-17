import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaymentMethodOpt } from '../domain/paymentMethodOpt';

@Injectable({
  providedIn: 'root'
})
export class PaymentMehtodService {

  private url: string = environment.apiUrl + '/api/paymentMethod/';

  constructor(public httpClient: HttpClient) { }

  createTokenHeader(): HttpHeaders {
    let token = localStorage.getItem('token');
    let headers = new HttpHeaders({ 'Authorization': token });
    return headers;
  }

  public findAll(): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.get(this.url + 'findAll', { headers: headers });
  }

  public findById(payId: number): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.get(this.url + 'findById/' + payId, { headers: headers });
  }

  public save(paymentMethodOpt: PaymentMethodOpt): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.post(this.url + 'save', paymentMethodOpt, { headers: headers });
  }

  public update(paymentMethodOpt: PaymentMethodOpt): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.put(this.url + 'update', paymentMethodOpt, { headers: headers });
  }

  public delete(payId: number): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.delete(this.url + 'delete/' + payId, { headers: headers });
  }
}
