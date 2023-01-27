import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeModel } from '../models/employee-model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {

  baseUrl: string = "http://ec2-54-175-205-144.compute-1.amazonaws.com:8080/api/customers";

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

}