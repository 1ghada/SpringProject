import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LigneCommandeAchatService } from 'src/app/services/ligne-commande.service';
@Component({
  selector: 'app-forms-elements',
  templateUrl: './forms-elements.component.html',
  styleUrls: ['./forms-elements.component.css']
})
export class FormsElementsComponent implements OnInit {
  Lignescommandes: any[] = [];
  constructor(private LigneCommandeAchatService: LigneCommandeAchatService, // ✅ Utilisation correcte du service
  private router: Router) { }

  ngOnInit(): void {
    this.getCommandes();
  }

  getCommandes() {
    this.LigneCommandeAchatService.getLignesCommandeAchat().subscribe({
      next: (data) => {
        this.Lignescommandes = data;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des commandes', err);
      }
    });
  }


}
