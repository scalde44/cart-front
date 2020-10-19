import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaymentMethodOpt } from '../domain/paymentMethodOpt';

@Injectable({
  providedIn: 'root'
})
export class PaymentMehtodService {

  private url: string = environment.apiUrl+'/api/paymentMethod/';

  constructor(public httpClient: HttpClient) { }

  public findAll(): Observable<any> {
    return this.httpClient.get(this.url + 'findAll');
  }

  public findById(payId:number): Observable<any> {
    return this.httpClient.get(this.url + 'findById/' + payId);
  }

  public save(paymentMethodOpt: PaymentMethodOpt): Observable<any> {
    return this.httpClient.post(this.url + 'save', paymentMethodOpt);
  }

  public update(paymentMethodOpt: PaymentMethodOpt): Observable<any> {
    return this.httpClient.put(this.url+'update',paymentMethodOpt);
  }

  public delete(payId:number): Observable<any> {
    return this.httpClient.delete(this.url + 'delete/' + payId);
  }
}
