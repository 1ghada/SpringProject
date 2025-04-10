import { Component, OnInit, ElementRef } from '@angular/core';
import { FournisseurService } from 'src/app/services/fournisseur.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})
export class AlertsComponent implements OnInit {
  fournisseurs: any[] = [];
  

  constructor(
    private elementRef: ElementRef,
    private fournisseurService: FournisseurService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadFournisseurs();
  }

  loadFournisseurs() {
    this.fournisseurService.getFournisseurs().subscribe(
      (data) => {
        this.fournisseurs = data;
       
      },
      (error) => {
        console.error('Erreur lors de la récupération des catégories', error);
      }
    );
  }
}
