package tn.itbs.erp.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import tn.itbs.erp.Models.CommandeAchat;
import tn.itbs.erp.Models.LigneCommandeAchat;
import tn.itbs.erp.Repository.CommandeAchatRepository;
import tn.itbs.erp.Repository.LigneCommandeAchatRepository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
@RequestMapping("/lignecommandeachats")
public class LigneCommandeAchatController {

    @Autowired
    private LigneCommandeAchatRepository ligneCommandeAchatRepository;

    @Autowired
    private CommandeAchatRepository commandeAchatRepository;

    // Créer une nouvelle ligne de commande
    @PostMapping
    public ResponseEntity<LigneCommandeAchat> createLigneCommandeAchat(@RequestBody LigneCommandeAchat ligneCommandeAchat) {
        // Récupérer la commande associée à cette ligne de commande en utilisant l'ID de la commande
        CommandeAchat commandeAchat = commandeAchatRepository.findById(ligneCommandeAchat.getCommande().getId())
                .orElseThrow(() -> new RuntimeException("Commande introuvable avec l'identifiant : " + ligneCommandeAchat.getCommande().getId()));

        // Associer la ligne de commande à la commande
        ligneCommandeAchat.setCommande(commandeAchat);

        // Sauvegarder la ligne de commande
        LigneCommandeAchat savedLigneCommandeAchat = ligneCommandeAchatRepository.save(ligneCommandeAchat);

        // Mettre à jour le montant de la commande en fonction de la ligne ajoutée
        double montantTotal = commandeAchat.getMontant() + (ligneCommandeAchat.getQuantite() * ligneCommandeAchat.getPrixUnitaire());

        // Mettre à jour la commande avec le montant recalculé
        commandeAchat.setMontant(montantTotal);
        commandeAchatRepository.save(commandeAchat);

        // Retourner la ligne de commande créée avec la commande mise à jour
        return ResponseEntity.ok(savedLigneCommandeAchat);
    }

    // Récupérer toutes les lignes de commande d'achat
    @GetMapping
    public List<LigneCommandeAchat> getAllLignesCommandeAchat() {
        return ligneCommandeAchatRepository.findAll();
    }

    // Récupérer une ligne de commande d'achat par ID
    @GetMapping("/{id}")
    public ResponseEntity<LigneCommandeAchat> getLigneCommandeAchatById(@PathVariable Long id) {
        return ligneCommandeAchatRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Mettre à jour une ligne de commande
    @PutMapping("/{id}")
    public ResponseEntity<LigneCommandeAchat> updateLigneCommandeAchat(
            @PathVariable Long id, @RequestBody LigneCommandeAchat ligneCommandeAchatDetails) {

        // Vérifier si la ligne de commande existe
        LigneCommandeAchat ligneCommandeAchat = ligneCommandeAchatRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("LigneCommandeAchat introuvable avec l'identifiant : " + id));

        // Mettre à jour les champs de la ligne de commande
        ligneCommandeAchat.setQuantite(ligneCommandeAchatDetails.getQuantite());
        ligneCommandeAchat.setPrixUnitaire(ligneCommandeAchatDetails.getPrixUnitaire());
        ligneCommandeAchat.setProduit(ligneCommandeAchatDetails.getProduit());
        ligneCommandeAchat.setCommande(ligneCommandeAchatDetails.getCommande()); // Assurez-vous que la commande n'est pas nulle

        // Sauvegarder la ligne de commande mise à jour
        LigneCommandeAchat updatedLigneCommandeAchat = ligneCommandeAchatRepository.save(ligneCommandeAchat);

        // Retourner la réponse avec la ligne de commande mise à jour
        return ResponseEntity.ok(updatedLigneCommandeAchat);
    }

    // Supprimer une ligne de commande d'achat par ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteLigneCommandeAchat(@PathVariable Long id) {
        LigneCommandeAchat ligneCommandeAchat = ligneCommandeAchatRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("LigneCommandeAchat introuvable avec l'identifiant : " + id));

        // Récupérer la commande associée à la ligne de commande
        CommandeAchat commandeAchat = ligneCommandeAchat.getCommande();

        // Calculer le montant total de la commande après suppression de la ligne
        double montantTotal = commandeAchat.getMontant() - (ligneCommandeAchat.getQuantite() * ligneCommandeAchat.getPrixUnitaire());

        // Mettre à jour le montant de la commande
        commandeAchat.setMontant(montantTotal);
        commandeAchatRepository.save(commandeAchat);

        // Supprimer la ligne de commande
        ligneCommandeAchatRepository.delete(ligneCommandeAchat);

        // Réponse de succès
        Map<String, Boolean> response = new HashMap<>();
        response.put("supprimé avec succès", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
