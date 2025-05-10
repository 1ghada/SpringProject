package tn.itbs.erp.Models;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class Fournisseur {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Le nom est obligatoire")
    @Column(unique = true) // Le nom doit être unique dans la base de données
    private String nom;

    @NotBlank(message = "Le contact est obligatoire")
    @Pattern(regexp = "^[0-9]{8}$", message = "Le contact doit contenir exactement 8 chiffres")
    private String contact;

    @NotNull(message = "La qualité du service est obligatoire")
    private String qualiteService;

    @NotNull(message = "La note est obligatoire")
    @Min(value = 1, message = "La note doit être supérieure ou égale à 1")
    @Max(value = 5, message = "La note doit être inférieure ou égale à 5")
    private double note;

}
