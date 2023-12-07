import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MetPago } from '../interfaces/met_pago';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MetPagoService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) { 
    this.myAppUrl = 'http://localhost:3000/';
    this.myApiUrl = 'api/met_pago';
  }
  getMetPago (): Observable<MetPago[]> {
    return this.http.get<MetPago[]>(`${this.myAppUrl}${this.myApiUrl}`)
  }

}
