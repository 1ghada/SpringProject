import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

const AUTH_API = 'http://localhost:9090/api/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  /** 👉 Connexion */
  loginUser(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post<any>(`${AUTH_API}/signin`, body).pipe(
      tap((response) => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          this.saveUser(response);
        } else {
          console.error('Token manquant dans la réponse.');
        }
      }),
      catchError((error) => {
        console.error('Erreur de connexion:', error);
        return throwError('Email ou mot de passe incorrect.');
      })
    );
  }
  

  /** 👉 Sauvegarder les infos utilisateur */
  saveUser(user: any): void {
    localStorage.setItem('userId', user.id);
    localStorage.setItem('userEmail', user.email);
    localStorage.setItem('userName', user.name || '');
  }

  /** 👉 Vérifier si l'utilisateur est connecté (avec expiration JWT) */
  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return false;
  
    try {
      const tokenPayload = this.decodeToken(token);
      if (tokenPayload && tokenPayload.exp) {
        const expiry = new Date(tokenPayload.exp * 1000);
        if (expiry < new Date()) {
          this.logout(); // Nettoyage complet
          return false;
        }
        return true;
      }
    } catch (e) {
      console.error('Erreur lors du décodage du token :', e);
      this.logout(); // En cas d'erreur de token, on déconnecte
      return false;
    }
  
    return false;
  }
  
  
  // Fonction pour décoder un token JWT (si vous utilisez JWT)
  decodeToken(token: string): any {
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('Le token est invalide');
    }
  
    const decoded = atob(parts[1]);  // Décoder la partie du payload du JWT
    return JSON.parse(decoded);
  }
  
  /** 👉 Déconnexion */
  logout(): void {
    console.log('Déconnexion en cours...');
    localStorage.clear(); // Nettoyer le localStorage
    console.log('Après déconnexion, token:', localStorage.getItem('token'));
  }
  
  
}
