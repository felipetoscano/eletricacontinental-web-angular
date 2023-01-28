import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeModel } from '../models/employee-model';

@Injectable({
  providedIn: 'root',
})

export class EmployeeService {

  //TODO: MANTER EM UM ARQUIVO SEPARADO
  private baseUrl: string = "http://ec2-54-175-205-144.compute-1.amazonaws.com:8080/api/customers";

  constructor(private http: HttpClient) { }

  getAll(): Observable<EmployeeModel[]> {
    return this.http.get<EmployeeModel[]>(this.baseUrl);
  }

  getById(id: number) : Observable<EmployeeModel> {
    return this.http.get<EmployeeModel>(this.baseUrl + '/' + id);
  }

  create(employee: EmployeeModel) : Observable<any> {
    return this.http.post<any>(this.baseUrl, employee);
  }

  update(id: number, employee: EmployeeModel) : Observable<any> {
    return this.http.put<any>(this.baseUrl + '/' + id, employee);
  }

  delete(id: number) : Observable<any> {
    return this.http.delete<any>(this.baseUrl + '/' + id);
  }
}