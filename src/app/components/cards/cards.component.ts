import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommandeAchatService } from 'src/app/services/commande-achat.service';
import { FournisseurService } from 'src/app/services/fournisseur.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

  commande: any = {
    id: null,
    fournisseur: { id: null, nom: '' },  // Initialiser l'objet fournisseur avec ID et nom
    dateCommande: '',
    statut:'',
    montant: 0
  };
  
  fournisseurs: any[] = [];  // Tableau pour stocker la liste des fournisseurs
  errorMessage: string = '';  // Déclaration de la variable errorMessage

  constructor(
    private commandeAchatService: CommandeAchatService,
    private fournisseurService: FournisseurService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getCommandeById(id);
    }
    this.getFournisseurs();  // Charger les fournisseurs au démarrage
  }

  // Récupérer une commande par ID pour la modifier
  getCommandeById(id: string): void {
    this.commandeAchatService.getCommandeAchatById(id).subscribe(
      (data) => {
        this.commande = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération de la commande :', error);
        this.errorMessage = 'Erreur lors de la récupération de la commande';  // Mise à jour de l'erreur
      }
    );
  }

  // Charger tous les fournisseurs
  getFournisseurs(): void {
    this.fournisseurService.getFournisseurs().subscribe(
      (data) => {
        this.fournisseurs = data;  // Affecter la liste des fournisseurs récupérés
      },
      (error) => {
        console.error('Erreur lors de la récupération des fournisseurs :', error);
        this.errorMessage = 'Erreur lors de la récupération des fournisseurs';  // Mise à jour de l'erreur
      }
    );
  }

  // Sauvegarder les modifications de la commande
  saveCommande(): void {
    if (this.commande.id) {
      this.commandeAchatService.updateCommandeAchat(this.commande).subscribe(
        (response) => {
          console.log('Commande modifiée avec succès');
          this.router.navigate(['/buttons']); // Rediriger vers la liste des commandes après modification
        },
        (error) => {
          console.error('Erreur lors de la modification de la commande', error);
          this.errorMessage = 'Erreur lors de la modification de la commande';  // Mise à jour de l'erreur
        }
      );
    }
  }

  // Appeler la méthode saveCommande lorsque le formulaire est soumis
  onSubmit(): void {
    this.saveCommande();
  }
}
