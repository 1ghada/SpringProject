import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LigneCommandeAchatService {
  private apiUrl = 'http://localhost:9090/lignecommandeachats'; // URL du backend pour les lignes de commande
  private apiCommandeUrl = 'http://localhost:9090/commandeachats'; // URL du backend pour les commandes d'achat

  constructor(private http: HttpClient) {}

  // Récupérer toutes les lignes de commande
  getLignesCommandeAchat(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Créer une nouvelle ligne de commande
  createLigneCommandeAchat(ligneCommandeAchat: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, ligneCommandeAchat);
  }

  // Récupérer une ligne de commande par ID
  getLigneCommandeAchatById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Mettre à jour une ligne de commande existante
  updateLigneCommandeAchat(id: number, ligneCommandeAchat: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, ligneCommandeAchat);
  }

  // Supprimer une ligne de commande par ID
  deleteLigneCommandeAchat(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  // Récupérer toutes les commandes d'achat pour lier une ligne à une commande spécifique
  getCommandesAchat(): Observable<any> {
    return this.http.get<any>(this.apiCommandeUrl);
  }
}
