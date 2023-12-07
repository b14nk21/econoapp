import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) { 
    this.myAppUrl = 'http://localhost:3000/';
    this.myApiUrl = 'api/users';
  }

  signIn (user: User): Observable<any> {
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, user);
  }

  login (user: User): Observable<string> {
    return this.http.post<string>(`${this.myAppUrl}${this.myApiUrl}/login`, user);
  }

  getUsers (): Observable<User[]>{
    return this.http.get<User[]>(`${this.myAppUrl}${this.myApiUrl}/mostrar`)
  }

  getUserNameById(userId: string): Observable<string> {
    const url = `${this.myAppUrl}${this.myApiUrl}/users/${userId}/name`; 
    return this.http.get<string>(url);
  }

}
