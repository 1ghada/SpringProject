import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FournisseurService } from 'src/app/services/fournisseur.service';

@Component({
  selector: 'app-badges',
  templateUrl: './badges.component.html',
  styleUrls: ['./badges.component.css']
})
export class BadgesComponent implements OnInit {
  fournisseur: any = {
    id: null,
    nom: '',
    contact: '',
    qualiteService: '',
    note: '',
    adresse: ''
  };

  constructor(
    private fournisseurService: FournisseurService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getFournisseurById(id);
    }
  }

  // Récupérer un fournisseur par ID pour le modifier
  getFournisseurById(id: string): void {
    this.fournisseurService.getFournisseurById(id).subscribe(
      (data) => {
        this.fournisseur = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération du fournisseur :', error);
      }
    );
  }

  // Sauvegarder les modifications du fournisseur
  saveFournisseur(): void {
    if (this.fournisseur.id) {
      this.fournisseurService.updateFournisseur(this.fournisseur).subscribe(
        (response) => {
          console.log('Fournisseur modifié avec succès');
          this.router.navigate(['/tables-data']); // Rediriger vers la liste des fournisseurs après modification
        },
        (error) => {
          console.error('Erreur lors de la modification du fournisseur', error);
        }
      );
    }
  }
}