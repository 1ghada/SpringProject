import { Component, OnInit } from '@angular/core';
import { LigneCommandeAchatService } from 'src/app/services/ligne-commande.service';
import { CommandeAchatService } from 'src/app/services/commande-achat.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  produit: string = '';
  quantite: number = 0;
  prixUnitaire: number = 0;
  commandeId: number | null = null;
  commandes: any[] = [];  // Pour stocker les commandes disponibles
  errorMessage: string = '';

  constructor(
    private ligneCommandeService: LigneCommandeAchatService,
    private commandeService: CommandeAchatService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCommandes();
  }

  // Charger les commandes disponibles
  loadCommandes(): void {
    this.commandeService.getCommandesAchat().subscribe(
      (data) => {
        this.commandes = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des commandes', error);
        this.errorMessage = 'Erreur lors du chargement des commandes.';
      }
    );
  }

  // Ajouter une ligne de commande
  addLigneCommande(): void {
    if (!this.produit || !this.quantite || !this.prixUnitaire || !this.commandeId) {
      this.errorMessage = 'Tous les champs sont obligatoires.';
      return;
    }

    const newLigneCommande = {
      produit: this.produit,
      quantite: this.quantite,
      prixUnitaire: this.prixUnitaire,
      commande: { id: this.commandeId } // Associer la commande via l'ID
    };

    // Utiliser le service pour ajouter la ligne de commande
    this.ligneCommandeService.createLigneCommandeAchat(newLigneCommande).subscribe(
      (response) => {
        alert('Ligne de commande ajoutée avec succès !');
        this.resetForm();  // Réinitialiser le formulaire
        this.router.navigate(['/buttons']);
      },
      (error) => {
        console.error('Erreur lors de l\'ajout de la ligne de commande', error);
        this.errorMessage = 'Erreur lors de l\'ajout de la ligne de commande';
      }
    );
  }

  // Réinitialiser le formulaire
  resetForm(): void {
    this.produit = '';
    this.quantite = 0;
    this.prixUnitaire = 0;
    this.commandeId = null;
  }
}
