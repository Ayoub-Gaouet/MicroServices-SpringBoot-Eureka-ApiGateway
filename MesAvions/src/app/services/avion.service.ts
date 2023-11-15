import { Company } from '../model/company.model';
import { Injectable } from '@angular/core';
import { Avion } from '../model/avion.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {apiURL, apiURLUser} from '../config';
import {AuthService} from "./auth.service";
import {Image} from "../model/image.model";
import {User} from "../model/user.model";
import {Role} from "../model/role.model";

const httpOptions = {
  headers: new HttpHeaders( {'Content-Type': 'application/json'} )
};

@Injectable({
  providedIn: 'root'
})
export class AvionService {
  avions! : Avion[];
  avion! : Avion[];
  company! :Company[];
  constructor(private http : HttpClient
  ,private authService:AuthService) {
  }


  listeCompany():Observable<Company[]>{
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.get<Company[]>(apiURL+"/com", {headers:httpHeaders});
  }
  consulterCompany(id:number): Company{
    return this.company.find(com => com.idCom == id)!;
  }
  listeAvions(): Observable<Avion[]> {
    return this.http.get<Avion[]>(apiURL+"/all");

  }
  ajouterAvion(av: Avion): Observable<Avion> {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.post<Avion>(apiURL+"/addav", av, {headers:httpHeaders});
  }

  supprimerAvion(id: number) {
    const url = `${apiURL}/delav/${id}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.delete(url, {headers:httpHeaders});

  }

  consulterAvion(id: number): Observable<Avion> {
    const url = `${apiURL}/getbyid/${id}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.get<Avion>(url,{headers:httpHeaders});
  }
  updateAvion(prod: Avion): Observable<Avion> {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.put<Avion>(apiURL+"/updateav", prod, {headers:httpHeaders});  }
  rechercherParCompany(idCom: number):Observable<Avion[]> {
    const url = `${apiURL}/avcom/${idCom}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.get<Avion[]>(url, {headers:httpHeaders});
  }
  uploadImage(file: File, filename: string): Observable<Image>{
    const imageFormData = new FormData();
    imageFormData.append('image', file, filename);
    const url = `${apiURL + '/image/upload'}`;
    return this.http.post<Image>(url, imageFormData);
  }
  loadImage(id: number): Observable<Image> {
    const url = `${apiURL + '/image/get/info'}/${id}`;
    return this.http.get<Image>(url);
  }
  listeUser(): Observable<User[]> {
    return this.http.get<User[]>(apiURLUser + "/all");
  }

  saveUser(user: { password: any; confirmPassword: any; email: any; username: any }): Observable<User> {
    return this.http.post<User>(apiURLUser + "/add", user);
  }
  supprimerUser(id: number) {
    const url = `${apiURLUser + "/deleteuser"}/${id}`;
    return this.http.delete(url, httpOptions);
  }
  getUserById(id: number) {
    return this.http.get<User>(apiURLUser + '/user/' + id);
  }
  getAllRoles() {
    return this.http.get<Role[]>(apiURLUser + '/allRoles');
  }
  getRoleById(id: number) {
    return this.http.get<Role>(apiURLUser + '/role/' + id);
  }
  addRoleToUser(id: number, role: Role) {
    const url = `${apiURLUser}/addRole/${id}`;
    return this.http.post(url, role);
  }

  removeRoleFromUser(id: number, role: Role) {
    const url = `${apiURLUser }/removeRole/${id}`;
    return this.http.post(url, role);
  }

  activateUser(username: string, verificationCode: string): Observable<User> {
    const url = `${apiURLUser}/activateUser/${username}`;
    const body = { verification_code: verificationCode };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    console.log(url);
    return this.http.post<User>(url, body, { headers });
  }
  sendVerificationCodeToEmail(email: string) {
    const url = `${apiURLUser}/forgotPassword/${email}`;
    return this.http.get(url, { responseType: 'text' }); // Use responseType 'text'
  }
  checkResetCode(email: string, verificationCode: string): Observable<boolean> {
    const url = `${apiURLUser}/checkResetCode/${email}`;
    const requestBody = { verification_code: verificationCode };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    console.log(url);
    return this.http.post<boolean>(url, requestBody, { headers });
  }
  resetPassword(email: string, password: string) {
    const url = `${apiURLUser}/resetPassword/${email}`;
    const requestBody = { password: password };
    return this.http.post<User>(url, requestBody);
  }


}
