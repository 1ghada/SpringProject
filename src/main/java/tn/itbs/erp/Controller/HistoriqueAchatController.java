package tn.itbs.erp.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.itbs.erp.Models.CommandeAchat;
import tn.itbs.erp.Models.HistoriqueAchat;
import tn.itbs.erp.Models.LigneCommandeAchat;
import tn.itbs.erp.Repository.CommandeAchatRepository;
import tn.itbs.erp.Repository.HistoriqueAchatRepository;
import tn.itbs.erp.Repository.LigneCommandeAchatRepository;


import org.springframework.data.domain.Pageable;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600,  allowCredentials="true")
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
    public ResponseEntity<?> createHistoriqueAchat(@RequestBody HistoriqueAchat historiqueAchat) {
        Long ligneCommandeId = historiqueAchat.getLigneCommande().getId();

        // ⚠ Vérifie si cette ligne a déjà un historique
        if (historiqueAchatRepository.findByLigneCommandeId(ligneCommandeId).isPresent()) {
            return ResponseEntity.badRequest().body("Cette ligne de commande a déjà un historique.");
        }

        LigneCommandeAchat ligneCommande = ligneCommandeAchatRepository.findById(ligneCommandeId)
                .orElseThrow(() -> new RuntimeException("Ligne de commande introuvable"));

        historiqueAchat.setProduit(ligneCommande.getProduit());

        CommandeAchat commande = ligneCommande.getCommande();
        if (commande != null) {
            commande.setStatut("Livrée");
            commandeRepository.save(commande);
        }

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
    
    @GetMapping("/top5fournisseurs")
    public ResponseEntity<List<Map<String, Object>>> getTop5Fournisseurs() {
        Pageable topFive = PageRequest.of(0, 5); // ✅ Pas besoin de cast
        List<Map<String, Object>> topFournisseurs = historiqueAchatRepository.findTop5FournisseursByDelaiLivraisonAsc(topFive);
        return ResponseEntity.ok(topFournisseurs);
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
