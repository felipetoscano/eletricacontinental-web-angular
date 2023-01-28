import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeModel } from '../models/employee-model';

@Injectable({
  providedIn: 'root',
})

export class EmployeeService {

  baseUrl: string = "http://localhost:8080/api/customers";

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<EmployeeModel[]> {
    return this.http.get(this.baseUrl) as Observable<EmployeeModel[]>;
  }

}