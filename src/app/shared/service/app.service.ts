import { Injectable} from '@angular/core';
import { from, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment } from './../../../environments/environment';

import { GenericResponse } from './../model/GenericResponse';
import { User } from './../model/User';
import { Product} from './../model/Product'

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private url = environment.url;
  private userLoggedIn: boolean;
  private user: User;
  private currentPage: string;


  constructor(private http: HttpClient) { }

  login(user: User): Observable<GenericResponse> {
    return this.http.post<GenericResponse>(`${this.url}${'user/login'}`, user);
  }
  /************************************ SERVICIOS PARA ABC DE USUARIO **************************************/

  findAllUser(): Observable<GenericResponse> {
    return this.http.get<GenericResponse>(`${this.url}${'user/findAll'}`);
  }
  createUser(user: User): Observable<GenericResponse> {
    return this.http.post<GenericResponse>(`${this.url}${'user/create'}`, user);
  }
  updateUser(user: User): Observable<GenericResponse> {
    return this.http.put<GenericResponse>(`${this.url}${'user/update'}`, user);
  }
  deleteUser(dbid: number): Observable<GenericResponse> {
    return this.http.delete<GenericResponse>(`${this.url}${'user/delete/'}${dbid}`);
  }
 
  /************************************ SERVICIOS PARA ABC DE PRODUCTOS **************************************/
  findByDbidProduct(dbid: number): Observable<GenericResponse> {
    return this.http.get<GenericResponse>(`${this.url}${'product/findByDbid/'}${dbid}`);
  }
  findAllProduct(): Observable<GenericResponse> {
    return this.http.get<GenericResponse>(`${this.url}${'product/findAll'}`);
  }
  createProduct(product: Product): Observable<GenericResponse> {
    return this.http.post<GenericResponse>(`${this.url}${'product/create'}`, product);
  }
  updateProduct(product: Product): Observable<GenericResponse> {
    return this.http.put<GenericResponse>(`${this.url}${'product/update'}`, product);
  }
  deleteProduct(dbid: number): Observable<GenericResponse> {
    return this.http.delete<GenericResponse>(`${this.url}${'product/delete/'}${dbid}`);
  }

  /*SET AND GET*/
  public setUserLoggedIn(userLoggedIn: boolean) {
    this.userLoggedIn = userLoggedIn;
  }

  public getUserLoggedIn() {
    return this.userLoggedIn;
  }

  public setUser(user: User) {
    this.user = user;
  }

  public getUser() {
    return this.user;
  }
  
  public setCurrentPage(currentPage: string) {
    this.currentPage = currentPage;
  }

  public getCurrentPage() {
    return this.currentPage;
  }

}
