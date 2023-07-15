import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private loginService: LoginService) {}

  canActivate(): boolean {
    const isAuthenticated = this.loginService.isUserAuthenticated();

    if (isAuthenticated) {
      return true; // Permite o acesso à rota
    } else {
      this.router.navigate(['/login']); // Redireciona para a página de login se não estiver autenticado
      return false; // Impede o acesso à rota
    }
  }
}
