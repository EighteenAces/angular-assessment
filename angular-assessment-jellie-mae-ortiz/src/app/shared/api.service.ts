import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {map} from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  user: any;

  constructor(private http: HttpClient) { }

  postEmployee(data : any){
    return this.http.post<any>("http://localhost:8080/api/add", data)
    .pipe(map((res:any) =>{
      return res;
    }))
  }
  getEmployee(){
    return this.http.get<any>("http://localhost:8080/api/users")
    .pipe(map((res:any) =>{
      return res;
    }))
  }

  updateEmployee(data : any,id: number){
    return this.http.put<any>("http://localhost:8080/api/update/" + id, data)
    .pipe(map((res:any) =>{
      return res;
    }))
  }
  
  deleteEmployee(id: number){
    return this.http.delete<any>("http://localhost:8080/api/delete/" + id )
    .pipe(map((res:any) =>{
      return res;
    }))
  }
  setUser(user: any){
    this.user = user
  }

  getUser(){
    return this.user      
  }
}

