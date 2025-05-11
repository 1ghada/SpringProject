package tn.itbs.erp.Models;


import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
public class HistoriqueAchat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fournisseur_id", nullable = false)
    private Fournisseur fournisseur;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ligne_commande_id", nullable = false)
    private LigneCommandeAchat ligneCommande;

    private Integer quantite;
    private String produit;
    private Integer delaiLivraison; // Représente le nombre de jours


    public HistoriqueAchat(Fournisseur fournisseur, LigneCommandeAchat ligneCommande, Integer quantite, String produit,Integer delaiLivraison) {
        this.fournisseur = fournisseur;
        this.ligneCommande = ligneCommande;
        this.quantite = quantite;
        this.produit = produit;
        this.delaiLivraison = delaiLivraison;
    }
}
