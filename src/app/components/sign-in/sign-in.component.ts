import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'
import { User } from 'src/app/interfaces/user';
import { ErrorService } from 'src/app/services/error.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  role: number = 0;
  typeuser: number = 0;
  loading: boolean = false;

  constructor(private toastr: ToastrService, 
    private _userService: UserService,
    private router: Router,
    private _errorService: ErrorService) {}

  addUser () {
    // validamos que el input no este vacio
    if (this.username == '' || this.password == '' || this.confirmPassword == '') {
      this.toastr.error('Todos los campos son obligatorios', 'Error');
      return;
    }

    // validamos que las password sean iguales
    if (this.password != this.confirmPassword) {
      this.toastr.error('Las passwords ingresadas son distintas', 'Error');
      return;
    }

    // Creamos el objeto
    const user: User = {
      username: this.username,
      password: this.password,
      role: this.role,
      typeuser: this.typeuser
    }

    this.loading = true

    this._userService.signIn(user).subscribe({
      next: (v) => {
      this.loading = false;
      this.toastr.success(`el usuario ${ this.username }fue registrado con exito`, 'Usuario registrado');
      this.router.navigate(['/login']);
      },
      error: (e: HttpErrorResponse) => {
        this._errorService.msgError(e)
        this.loading = false
      },
      complete: () => console.info('complete')
    })

    
    // ANTIGUA FORMA
    // this._userService.signIn(user).subscribe(data => {
    //   this.loading = false
    //   this.toastr.success(`el usuario ${ this.username }fue registrado con exito`, 'Usuario registrado');
    //   this.router.navigate(['/login'])
    // }, (event: HttpErrorResponse) => {
    //   if (event.error.msg) {
    //     this.toastr.error(event.error.msg, 'Error')
    //   } else {
    //     this.toastr.error('Ups ocurrio un error, comuniquese con el administrador', 'Error')
    //   }
    //   this.loading = false
    // })

  }

}
