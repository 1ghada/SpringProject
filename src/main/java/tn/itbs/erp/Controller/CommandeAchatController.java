package tn.itbs.erp.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import tn.itbs.erp.Models.CommandeAchat;
import tn.itbs.erp.Models.Fournisseur;
import tn.itbs.erp.Repository.CommandeAchatRepository;
import tn.itbs.erp.Repository.FournisseurRepository;  // Correct Repository import

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600, allowCredentials="true") 
@RestController
@RequestMapping("/commandeachats")
public class CommandeAchatController {

    @Autowired
    private CommandeAchatRepository commandeAchatRepository;

    @Autowired
    private FournisseurRepository fournisseurRepository;  // Correct variable name

    // Récupérer toutes les commandes d'achat
    @GetMapping
    public List<CommandeAchat> getAllCommandesAchat() {
        return commandeAchatRepository.findAll();
    }

    // Récupérer une commande d'achat par ID
    @GetMapping("/{id}")
    public ResponseEntity<CommandeAchat> getCommandeAchatById(@PathVariable Long id) {
        return commandeAchatRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Récupérer tous les fournisseurs
    @GetMapping("/fournisseurs")
    public List<Fournisseur> getAllFournisseurs() {
        return fournisseurRepository.findAll();  // Correct usage of FournisseurRepository
    }

    // Créer une nouvelle commande d'achat
    @PostMapping
    public CommandeAchat createCommandeAchat(@RequestBody CommandeAchat commandeAchat) {
        // Créer la commande avec un montant de 0
        commandeAchat.setMontant(0.0);
        return commandeAchatRepository.save(commandeAchat);
    }

    // Supprimer une commande d'achat par ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteCommandeAchat(@PathVariable Long id) {
        CommandeAchat commandeAchat = commandeAchatRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("CommandeAchat introuvable avec l'identifiant : " + id));
        commandeAchatRepository.delete(commandeAchat);
        Map<String, Boolean> response = new HashMap<>();
        response.put("supprimé avec succès", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

    // Mettre à jour une commande d'achat
    @PutMapping("/{id}")
    public ResponseEntity<CommandeAchat> updateCommandeAchat(@PathVariable Long id, @RequestBody CommandeAchat commandeAchatDetails) {
        CommandeAchat commandeAchat = commandeAchatRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("CommandeAchat introuvable avec l'identifiant : " + id));

        commandeAchat.setFournisseur(commandeAchatDetails.getFournisseur());
        commandeAchat.setDate(commandeAchatDetails.getDate());
        commandeAchat.setStatut(commandeAchatDetails.getStatut());
        commandeAchat.setMontant(commandeAchatDetails.getMontant());

        CommandeAchat updatedCommandeAchat = commandeAchatRepository.save(commandeAchat);
        return ResponseEntity.ok(updatedCommandeAchat);
    }
}
