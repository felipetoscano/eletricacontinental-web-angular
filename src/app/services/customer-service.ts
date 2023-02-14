import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CustomerModel } from '../models/customer-model';

@Injectable({
  providedIn: 'root',
})

export class CustomerService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<CustomerModel[]> {
    return this.http.get<CustomerModel[]>(environment.apiUrlBase);
  }

  getById(id: number) : Observable<CustomerModel> {
    return this.http.get<CustomerModel>(environment.apiUrlBase + '/' + id);
  }

  create(customer: CustomerModel) : Observable<any> {
    return this.http.post<any>(environment.apiUrlBase, customer);
  }

  update(id: number, customer: CustomerModel) : Observable<any> {
    return this.http.put<any>(environment.apiUrlBase + '/' + id, customer);
  }

  delete(id: number) : Observable<any> {
    return this.http.delete<any>(environment.apiUrlBase + '/' + id);
  }
}