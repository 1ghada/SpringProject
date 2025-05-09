import { Component, OnInit } from '@angular/core';
import { HistoriqueAchatService } from 'src/app/services/historique-achat.service';
import { LigneCommandeAchatService } from 'src/app/services/ligne-commande.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  historiqueAchat: any = {
    fournisseur: { nom: '' },
    produit: { nom: '' },
    quantite: 0,
    delaiLivraison: 0,
    ligneCommande: null
  };

  lignesCommande: any[] = [];
  errorMessage: string = '';

  constructor(
    private router: Router,
    private historiqueAchatService: HistoriqueAchatService,
    private ligneCommandeAchatService: LigneCommandeAchatService
  ) {}

  ngOnInit(): void {
    this.getLignesCommandes();
  }

  getLignesCommandes(): void {
    this.ligneCommandeAchatService.getLignesCommandeNonLivrees().subscribe(
      (data) => {
        this.lignesCommande = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des lignes de commande non livrées', error);
        this.errorMessage = 'Impossible de charger les lignes de commande.';
      }
    );
  }
  
  

  onLigneCommandeChange(): void {
    if (this.historiqueAchat.ligneCommande) {
        const ligne = this.historiqueAchat.ligneCommande;

        // Vérification et remplissage automatique des champs
        this.historiqueAchat.produit = ligne.produit ? ligne.produit : { nom: '' };
        this.historiqueAchat.fournisseur = ligne.commande && ligne.commande.fournisseur ? ligne.commande.fournisseur : { nom: '' };
        this.historiqueAchat.quantite = ligne.quantite ? ligne.quantite : 0;
    }
  }

  createHistoriqueAchat(): void {
    if (!this.historiqueAchat.ligneCommande) {
      this.errorMessage = "Veuillez sélectionner une ligne de commande.";
      return;
    }

    // Extraire uniquement l'ID de la ligne de commande pour l'envoyer au backend
    const historiqueAchatPayload = {
      fournisseur: this.historiqueAchat.fournisseur,
      produit: this.historiqueAchat.produit,
      quantite: this.historiqueAchat.quantite,
      delaiLivraison: this.historiqueAchat.delaiLivraison,
      ligneCommande: { id: this.historiqueAchat.ligneCommande.id }
    };

    this.historiqueAchatService.createHistoriqueAchat(historiqueAchatPayload).subscribe(
      (data) => {
        console.log('Historique d\'achat ajouté avec succès', data);
        this.resetForm();
        this.router.navigate(['/buttons']);
        
      },
      (error) => {
        console.error('Erreur lors de l\'ajout de l\'historique d\'achat', error);
        this.errorMessage = 'Erreur lors de l\'ajout de l\'historique d\'achat.';
      }
    );
  }

  resetForm(): void {
    this.historiqueAchat = {
      fournisseur: { nom: '' },
      produit: { nom: '' },
      quantite: 0,
      delaiLivraison: '',
      ligneCommande: null
    };
  }
}
