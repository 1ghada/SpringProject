import { Component, OnInit, ElementRef } from '@angular/core';
import { HistoriqueAchatService } from 'src/app/services/historique-achat.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  topFournisseurs: any[] = [];

  constructor(private HistoriqueAchatService: HistoriqueAchatService) {}

  ngOnInit(): void {
    this.HistoriqueAchatService.getTop5Fournisseurs().subscribe({
      next: (data) => {
        this.topFournisseurs = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des fournisseurs :', err);
      }
    });
}}
