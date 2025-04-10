import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommandeAchatService } from 'src/app/services/commande-achat.service';
@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  commande: any;  // Utilisation de 'any' pour un objet sans modèle spécifique

  constructor(
    private route: ActivatedRoute,
    private commandeAchatService: CommandeAchatService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getCommandeById(+id);  // Récupérer la commande par ID
    }
  }

  // Récupérer les détails d'une commande par son ID
  getCommandeById(id: number): void {
    this.commandeAchatService.getCommandeAchatById(id.toString()).subscribe(
      (data: any) => {
        this.commande = data;  // Affecter les données récupérées à l'objet commande
      },
      (error) => {
        console.error('Erreur lors de la récupération de la commande', error);
      }
    );
  }

  // Fonctions pour modifier et supprimer la commande, si nécessaire
  editCommande(commande: any) {
    // Logique pour modifier la commande
  }

  deleteCommande(id: number) {
    // Logique pour supprimer la commande
  }
}
