import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['../../shared/sass/main.scss']
})
export class EmpresasComponent {
  users: any[] = []; // Declara la variable para almacenar las empresas
  selectedUser: any | null = null;

  constructor(private userService: UserService, private router: Router) {} // Ajusta según tus necesidades

  ngOnInit() {
    // Llama a tu servicio para obtener las empresas
    this.userService.getUsers().subscribe((data: any) => {
      this.users = data; // Asigna los datos obtenidos a la variable empresas
    });
  }

  selectUser(user: any) {
    this.selectedUser = user;
  }

  aceptar() {
    if (this.selectedUser) {
      // Navegar a la ruta de facturación con el ID de la empresa seleccionada
      this.router.navigate(['/pointSale/', this.selectedUser.iduser]);
    }
  }
  
}
