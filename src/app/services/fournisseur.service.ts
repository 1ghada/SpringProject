import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FournisseurService {
  private apiUrl = 'http://localhost:9090/api/v1/fournisseurs';

  constructor(private http: HttpClient) {}

  getFournisseurs(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`);
  }


 

  createFournisseur(fournisseur: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, fournisseur);
  }

   // Récupérer un fournisseur par ID
   getFournisseurById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Mettre à jour un fournisseur
  updateFournisseur(fournisseur: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${fournisseur.id}`, fournisseur);
  }

  

  deleteFournisseur(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
