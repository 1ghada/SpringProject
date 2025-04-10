import { Component, OnInit } from '@angular/core';
import { CommandeAchatService } from 'src/app/services/commande-achat.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.css']
})
export class ButtonsComponent implements OnInit {

  commandes: any[] = [];

  constructor(
    private commandeAchatService: CommandeAchatService, // ✅ Utilisation correcte du service
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCommandes();
  }

  getCommandes() {
    this.commandeAchatService.getCommandesAchat().subscribe({
      next: (data) => {
        this.commandes = data;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des commandes', err);
      }
    });
  }

  viewCommande(id: number) {
    this.router.navigate(['carousel', id]); // Navigation vers la page des détails de la commande
  }

  editCommande(commande: any) {
    this.router.navigate(['/cards', commande.id]); // Navigation vers la page de modification de la commande
  }

  deleteCommande(id: number) {
    if (confirm('Voulez-vous vraiment supprimer cette commande ?')) {
      this.commandeAchatService.deleteCommandeAchat(id).subscribe({
        next: () => {
          alert('Commande supprimée avec succès !');
          this.getCommandes(); // Recharge la liste des commandes après suppression
        },
        error: (err) => {
          console.error('Erreur lors de la suppression', err);
        }
      });
    }
  }
}
