import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommandeAchatService {
  private apiUrl = 'http://localhost:9090/commandeachats'; // URL du backend
  private apiUrll = 'http://localhost:9090/api/v1/fournisseurs';
  constructor(private http: HttpClient) {}

  // Récupérer toutes les commandes d'achat
  getCommandesAchat(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Créer une nouvelle commande d'achat
  createCommandeAchat(commandeAchat: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, commandeAchat);
  }

  // Récupérer une commande d'achat par ID
  getCommandeAchatById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Mettre à jour une commande d'achat existante
  updateCommandeAchat(commandeAchat: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${commandeAchat.id}`, commandeAchat);
  }
  getFournisseurs(): Observable<any> {
    return this.http.get<any>(`${this.apiUrll}`);
  }


  // Supprimer une commande d'achat par ID
  deleteCommandeAchat(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
