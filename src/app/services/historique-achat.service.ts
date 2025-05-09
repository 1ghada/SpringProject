import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistoriqueAchatService {
  private apiUrl = 'http://localhost:9090/historiqueachats';  // Remplacez par l'URL correcte de votre API

  private BaseUrl = 'http://localhost:9090/historiqueachats/top5fournisseurs';
  constructor(private http: HttpClient) {}

  // Récupérer tous les historiques d'achats
  getHistoriqueAchats(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`);
  }
  getTop5Fournisseurs(): Observable<any[]> {
    return this.http.get<any[]>(this.BaseUrl);
  }

  // Créer un nouvel historique d'achat
  createHistoriqueAchat(historiqueAchat: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, historiqueAchat);
  }

  // Récupérer un historique d'achat par ID
  getHistoriqueAchatById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Mettre à jour un historique d'achat
  updateHistoriqueAchat(historiqueAchat: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${historiqueAchat.id}`, historiqueAchat);
  }

  // Supprimer un historique d'achat
  deleteHistoriqueAchat(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
