import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FournisseurService } from 'src/app/services/fournisseur.service';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.css']
})
export class AccordionComponent implements OnInit {

  fournisseur: any;  // Utilisation de 'any' pour un objet sans modèle spécifique

  constructor(
    private route: ActivatedRoute,
    private fournisseurService: FournisseurService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getFournisseurById(+id);
    }
  }

  getFournisseurById(id: number): void {
    this.fournisseurService.getFournisseurById(id.toString()).subscribe(
      (data: any) => {  // Le service peut aussi renvoyer un objet dynamique
        this.fournisseur = data;  // Pas de modèle spécifique ici
      },
      (error) => {
        console.error('Erreur lors de la récupération du fournisseur', error);
      }
    );
  }

  // Fonctions pour modifier et supprimer le fournisseur, si nécessaire
  editFournisseur(fournisseur: any) {
    // Logique pour modifier
  }

  deleteFournisseur(id: number) {
    // Logique pour supprimer
  }
}
