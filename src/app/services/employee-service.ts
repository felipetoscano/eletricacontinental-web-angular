import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { EmployeeModel } from '../models/employee-model';

@Injectable({
  providedIn: 'root',
})

export class EmployeeService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<EmployeeModel[]> {
    return this.http.get<EmployeeModel[]>(environment.apiUrlBase);
  }

  getById(id: number) : Observable<EmployeeModel> {
    return this.http.get<EmployeeModel>(environment.apiUrlBase + '/' + id);
  }

  create(employee: EmployeeModel) : Observable<any> {
    return this.http.post<any>(environment.apiUrlBase, employee);
  }

  update(id: number, employee: EmployeeModel) : Observable<any> {
    return this.http.put<any>(environment.apiUrlBase + '/' + id, employee);
  }

  delete(id: number) : Observable<any> {
    return this.http.delete<any>(environment.apiUrlBase + '/' + id);
  }
}