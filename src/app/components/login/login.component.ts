import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'
import { User } from 'src/app/interfaces/user';
import { ErrorService } from 'src/app/services/error.service';
import { UserService } from 'src/app/services/user.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  role: number = 0;
  typeuser: number = 0;
  loading: boolean = false;


  constructor(private toastr: ToastrService,
    private _userService: UserService,
    private router: Router,
    private _errorService: ErrorService,
    private jwtHelper: JwtHelperService) { 
    
  }

  login() {
    // validamos que el input no este vacio
    if (this.username == '' || this.password == '') {
      this.toastr.error('Todos los campos son obligatorios', 'Error');
      return;
    }

    // Creamos el objeto
    const user: User = {
      username: this.username,
      password: this.password,
      role: this.role,
      typeuser: this.typeuser
    }

    this.loading = true;
    this._userService.login(user).subscribe({
      next: (token) => {
        localStorage.setItem('token', token);

        // Decodificar el token para obtener información del usuario
        const decodedToken = this.jwtHelper.decodeToken(token);

        // Redirigir según el rol (idrole) del usuario
        if (decodedToken.idrole === 1) {
          this.router.navigate(['/empresas']);
        } else if (decodedToken.idrole === 2) {
          this.router.navigate(['/pointSale']);
        } else {
          // Redirigir a otra ruta o manejar el caso por defecto
        }
      },
      error: (e: HttpErrorResponse) => {
        this.loading = false;
        this._errorService.msgError(e);
      },
      complete: () => console.info('complete')
    })

  }

}
