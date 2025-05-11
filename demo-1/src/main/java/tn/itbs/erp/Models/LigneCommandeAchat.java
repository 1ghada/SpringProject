package tn.itbs.erp.Models;




import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
public class LigneCommandeAchat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "commande_id", nullable = false)
  
    private CommandeAchat commande;

    @NotNull(message = "Le produit est obligatoire")
    private String produit;

    @NotNull(message = "La quantité est obligatoire")
    private Integer quantite;

    @NotNull(message = "Le prix unitaire est obligatoire")
    private Double prixUnitaire;

    public LigneCommandeAchat(CommandeAchat commande, String produit, Integer quantite, Double prixUnitaire) {
        this.commande = commande;
        this.produit = produit;
        this.quantite = quantite;
        this.prixUnitaire = prixUnitaire;
    }
}