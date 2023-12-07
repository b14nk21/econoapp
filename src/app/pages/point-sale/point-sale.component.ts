import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-point-sale',
  templateUrl: './point-sale.component.html',
  styleUrls: ['../../shared/sass/main.scss']
})
export class PointSaleComponent {
  iduser: string = '';
  empresaNombre: string = '';

  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.iduser = params['id'];
      // Aquí puedes usar this.id como el ID de la empresa seleccionada
      this.userService.getUserNameById(this.iduser).subscribe((response: any) => {
        this.empresaNombre = response.userName;
        // Aquí puedes usar this.empresaNombre como el nombre de la empresa seleccionada
      });
    });
  }
  
  facturacion () {
    if (this.iduser) {
      // Navegar a la ruta de facturación con el ID de la empresa seleccionada
      this.router.navigate(['/facturacion/', this.iduser]);
    }
  }


}
