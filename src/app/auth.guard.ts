import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {}

  canActivate(): boolean {
    const isAuthenticated = this.authService.isAuthenticated();
    console.log('✅ AuthGuard appelé - utilisateur authentifié ? =>', isAuthenticated);
    
    if (isAuthenticated) {
      return true;
    } else {
      console.log('❌ Accès refusé. Redirection vers /pages-login');
      this.router.navigate(['/pages-login']);
      return false;
    }
  }
  
  
}