import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FournisseurService } from 'src/app/services/fournisseur.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements OnInit {

  fournisseurForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private fournisseurService: FournisseurService,
    private router: Router
  ) {
    // Initialisation du formulaire avec des champs par défaut
    this.fournisseurForm = this.formBuilder.group({
      nom: ['', Validators.required],  // Validation de la présence du nom
      contact: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]], // Validation contact : 8 chiffres
      qualiteService: ['', Validators.required],  // Validation de la qualité du service
      note: [0, [Validators.required, Validators.min(1), Validators.max(5)]]  // Validation note : entre 1 et 5
    });
  }

  ngOnInit(): void {
    // Aucun traitement spécifique ici pour la création
  }

  // Soumettre le formulaire pour ajouter un fournisseur
  onSubmit(): void {
    if (this.fournisseurForm.valid) {
      this.fournisseurService.createFournisseur(this.fournisseurForm.value).subscribe(
        (response) => {
          console.log('Fournisseur ajouté avec succès :', response);
          alert('Fournisseur ajouté avec succès !');
          this.router.navigate(['/tables-data']);  // Redirection vers la liste des fournisseurs
        },
        (error) => {
          console.error('Erreur lors de l\'ajout du fournisseur :', error);
        }
      );
    }
  }
}