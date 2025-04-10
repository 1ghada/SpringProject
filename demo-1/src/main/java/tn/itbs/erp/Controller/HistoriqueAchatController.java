package tn.itbs.erp.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.itbs.erp.Models.CommandeAchat;
import tn.itbs.erp.Models.HistoriqueAchat;
import tn.itbs.erp.Models.LigneCommandeAchat;
import tn.itbs.erp.Repository.CommandeAchatRepository;
import tn.itbs.erp.Repository.HistoriqueAchatRepository;
import tn.itbs.erp.Repository.LigneCommandeAchatRepository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
@RequestMapping("/historiqueachats")
public class HistoriqueAchatController {

    @Autowired
    private HistoriqueAchatRepository historiqueAchatRepository;

    @Autowired
    private LigneCommandeAchatRepository ligneCommandeAchatRepository;

    @Autowired
    private CommandeAchatRepository commandeRepository; // ✅ Ajout du repository des commandes

    @PostMapping
    public ResponseEntity<HistoriqueAchat> createHistoriqueAchat(@RequestBody HistoriqueAchat historiqueAchat) {
        // Récupérer la ligne de commande associée
        LigneCommandeAchat ligneCommande = ligneCommandeAchatRepository.findById(historiqueAchat.getLigneCommande().getId())
                .orElseThrow(() -> new RuntimeException("Ligne de commande introuvable"));

        // Associer le produit à l'historique d'achat
        historiqueAchat.setProduit(ligneCommande.getProduit());

        // ✅ Récupérer la commande associée à cette ligne de commande
        CommandeAchat commande = ligneCommande.getCommande();
        if (commande != null) {
            commande.setStatut("Livrée");  // Mettre à jour le statut
            commandeRepository.save(commande);  // ✅ Sauvegarder la commande mise à jour
        }

        // Sauvegarder l'historique d'achat
        HistoriqueAchat savedHistoriqueAchat = historiqueAchatRepository.save(historiqueAchat);
        return ResponseEntity.ok(savedHistoriqueAchat);
    }

    @GetMapping
    public List<HistoriqueAchat> getAllHistoriqueAchats() {
        return historiqueAchatRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<HistoriqueAchat> getHistoriqueAchatById(@PathVariable Long id) {
        return historiqueAchatRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<HistoriqueAchat> updateHistoriqueAchat(@PathVariable Long id, @RequestBody HistoriqueAchat historiqueAchatDetails) {
        HistoriqueAchat historiqueAchat = historiqueAchatRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("HistoriqueAchat introuvable avec l'identifiant : " + id));

        historiqueAchat.setFournisseur(historiqueAchatDetails.getFournisseur());
        historiqueAchat.setLigneCommande(historiqueAchatDetails.getLigneCommande());
        historiqueAchat.setQuantite(historiqueAchatDetails.getQuantite());
        historiqueAchat.setProduit(historiqueAchatDetails.getProduit());
        historiqueAchat.setDelaiLivraison(historiqueAchatDetails.getDelaiLivraison());

        HistoriqueAchat updatedHistoriqueAchat = historiqueAchatRepository.save(historiqueAchat);
        return ResponseEntity.ok(updatedHistoriqueAchat);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteHistoriqueAchat(@PathVariable Long id) {
        HistoriqueAchat historiqueAchat = historiqueAchatRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("HistoriqueAchat introuvable avec l'identifiant : " + id));

        historiqueAchatRepository.delete(historiqueAchat);

        Map<String, Boolean> response = new HashMap<>();
        response.put("supprimé avec succès", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
