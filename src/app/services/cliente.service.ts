import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from '../interfaces/cliente';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) { 
    this.myAppUrl = 'http://localhost:3000/';
    this.myApiUrl = 'api/clientes';
  }

  addCliente(cliente: Cliente): Observable<any> {
    return this.http.post<Cliente | null>(`${this.myAppUrl}${this.myApiUrl}/addclientes`, cliente);
  }

}
