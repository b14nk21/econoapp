import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Venta } from '../interfaces/venta';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VentaService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) { 
    this.myAppUrl = 'http://localhost:3000/';
    this.myApiUrl = 'api/venta';
  }

  addVenta(venta: Venta): Observable<any> {
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}/addVenta`, venta);
  }
}
