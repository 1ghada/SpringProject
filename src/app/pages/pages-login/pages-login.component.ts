import { Component, OnInit } from '@angular/core';
import {AuthService} from 'src/app/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-pages-login',
  templateUrl: './pages-login.component.html',
  styleUrls: ['./pages-login.component.css']
})
export class PagesLoginComponent implements OnInit {

  email: string = '';
  password: string = '';
  // app.component.ts
constructor(private router: Router, private authService: AuthService) {
  const token = localStorage.getItem('token');
  if (!token || !this.authService.isAuthenticated()) {
    this.router.navigate(['/pages-login']);
  }
}

  ngOnInit(): void {
    
  }

  login(): void {
    this.authService.loginUser(this.email, this.password).subscribe(
      response => {
        if (response && response.token) {
          alert('Bienvenue .');
          this.router.navigate(['/dashboard']);
        } else {
          alert('Token non reçu. Vérifiez la réponse du backend.');
        }
      },
      error => {
        console.error('Erreur de connexion', error);
        alert('Email ou mot de passe incorrect.');
      }
    );
  }
  
  


  logout(): void {
    this.authService.logout(); 
    this.router.navigate(['/pages-login']);
  }
  
  
}