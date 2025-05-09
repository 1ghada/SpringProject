import { Component, OnInit, ElementRef } from '@angular/core';
import{HistoriqueAchatService }from 'src/app/services/historique-achat.service';
@Component({
  selector: 'app-charts-apexcharts',
  templateUrl: './charts-apexcharts.component.html',
  styleUrls: ['./charts-apexcharts.component.css']
})
export class ChartsApexchartsComponent implements OnInit {

  historiques: any[] = [];

  constructor(private HistoriqueAchatService: HistoriqueAchatService) {}

  ngOnInit(): void {
    this.getAllHistoriques();
  }

  getAllHistoriques() {
    this.HistoriqueAchatService.getHistoriqueAchats().subscribe({
      next: (data) => {
        this.historiques = data;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des historiques', err);
      }
    });
  }


}
