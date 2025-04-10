import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CommandeAchatService } from 'src/app/services/commande-achat.service';
import { FournisseurService } from 'src/app/services/fournisseur.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-list-group',
  templateUrl: './list-group.component.html',
  styleUrls: ['./list-group.component.css']
})
export class ListGroupComponent implements OnInit {
  commande: any = {
    id: null,
    fournisseur: { id: null, nom: '' },  // Initialiser l'objet fournisseur avec ID et nom
    dateCommande: '',
    statut:'',
    montant: 0
  };
  fournisseurs: any[] = [];  // Tableau pour stocker la liste des fournisseurs
  errorMessage: string = ''; 

  constructor(
    private router: Router,
    private CommandeAchatService: CommandeAchatService,
    private fournisseurService: FournisseurService
  ) {}

  ngOnInit(): void {
    this.loadFournisseurs();
  }

  loadFournisseurs(): void {
    this.fournisseurService.getFournisseurs().subscribe(
      (data) => {
        this.fournisseurs = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des fournisseurs', error);
      }
    );
  }

  onSubmit(): void {
    console.log('Données envoyées:', this.commande); // Vérification
    this.CommandeAchatService.createCommandeAchat(this.commande).subscribe(
      (response) => {
        console.log('Commande ajoutée avec succès', response);
        alert('Commande ajoutée avec succès !');
        this.router.navigate(['/buttons']);
      },
      (error) => {
        console.error('Erreur lors de l\'ajout de la commande', error);
        this.errorMessage = error.message || 'Une erreur est survenue lors de l\'ajout de la commande.';
      }
    );
  }
  
}

