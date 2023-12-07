import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MetPagoService } from 'src/app/services/met-pago.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-facturacion',
  templateUrl: './facturacion.component.html',
  styleUrls: ['../../shared/sass/main.scss']
})
export class FacturacionComponent {
  iduser: string = '';
  empresaNombre: string = '';
  met_pagos: any[] = []; 

  constructor(private route: ActivatedRoute, private met_pagoService: MetPagoService, private userService: UserService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.iduser = params['id'];
      // Aquí puedes usar this.id como el ID de la empresa seleccionada
      this.userService.getUserNameById(this.iduser).subscribe((response: any) => {
        this.empresaNombre = response.userName;
        // Aquí puedes usar this.empresaNombre como el nombre de la empresa seleccionada
      });
    });

    this.met_pagoService.getMetPago().subscribe((data: any) => {
      this.met_pagos = data; // Asigna los datos obtenidos a la variable empresas
    });
  }


}
