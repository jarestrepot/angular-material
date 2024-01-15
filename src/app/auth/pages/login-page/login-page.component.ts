import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styles: [
  ]
})
export class LoginPageComponent {

  constructor(
    private authService: AuthService,
    private router:Router,
  ){}
  onLogin(): void{
    this.authService.login( 'javier.010@gamil.com', '123456' )
      .subscribe( {
        next: () => this.router.navigate(['/heroes/list']),
        error: () => console.log('Mandar el error!')
      })
  }
}
