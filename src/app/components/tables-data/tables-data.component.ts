import { Component, OnInit, ElementRef } from '@angular/core';
import { FournisseurService } from 'src/app/services/fournisseur.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tables-data',
  templateUrl: './tables-data.component.html',
  styleUrls: ['./tables-data.component.css']
})
export class TablesDataComponent implements OnInit {
  fournisseurs: any[] = [];

  constructor(
    private elementRef: ElementRef,
    private fournisseurService: FournisseurService, // ✅ Utilisation correcte du service
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadFournisseurs();
    
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "../assets/js/main.js";
    this.elementRef.nativeElement.appendChild(script);
  }

  loadFournisseurs() {
    this.fournisseurService.getFournisseurs().subscribe({
      next: (data) => {
        this.fournisseurs = data;
      },
      error: (err) => {
        console.error("Erreur lors du chargement des fournisseurs :", err);
      }
    });
  }

  viewFournisseur(id: number) {
    this.router.navigate(['/accordion', id]);
  }

  editFournisseur(fournisseur: any) {
    this.router.navigate(['/badges', fournisseur.id]);
  }

  deleteFournisseur(id: number) {
    if (confirm("Voulez-vous vraiment supprimer ce fournisseur ?")) {
      this.fournisseurService.deleteFournisseur(id).subscribe({
        next: () => {
          alert("Fournisseur supprimé avec succès !");
          this.loadFournisseurs();
        },
        error: (err) => {
          console.error("Erreur lors de la suppression :", err);
        }
      });
    }
  }
}
