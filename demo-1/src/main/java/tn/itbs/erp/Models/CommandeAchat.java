package tn.itbs.erp.Models;

import java.util.Date;

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
public class CommandeAchat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "fournisseur_id", nullable = false)
    private Fournisseur fournisseur;

    @NotNull(message = "La date est obligatoire")
    private Date date;

    @NotNull(message = "Le statut est obligatoire")
    private String statut;

    @NotNull(message = "Le montant est obligatoire")
    private Double montant;

    public CommandeAchat(Fournisseur fournisseur, Date date, String statut, Double montant) {
        this.fournisseur = fournisseur;
        this.date = date;
        this.statut = statut;
        this.montant = montant;
    }
}
