package tn.itbs.erp.Controller;

import tn.itbs.erp.Exception.ResourceNotFoundException;
import tn.itbs.erp.Models.Fournisseur;
import tn.itbs.erp.Repository.FournisseurRepository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1")
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600) // Suppression de la partie "allowCredentials" car cela n'est plus nécessaire
public class FournisseurController {

    @Autowired
    private FournisseurRepository fournisseurRepo;

    // Récupérer tous les fournisseurs
    @GetMapping("/fournisseurs")
    public List<Fournisseur> getAllFournisseurs() {
        return fournisseurRepo.findAll();
    }

    // Créer un fournisseur
    @PostMapping("/fournisseurs")
    public Fournisseur createFournisseur(@RequestBody Fournisseur fournisseur) {
        return fournisseurRepo.save(fournisseur);
    }

    // Récupérer un fournisseur par ID
    @GetMapping("/fournisseurs/{id}")
    public ResponseEntity<Fournisseur> getFournisseurById(@PathVariable Long id) {
        Fournisseur fournisseur = fournisseurRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Fournisseur introuvable avec l'identifiant : " + id));
        return ResponseEntity.ok(fournisseur);
    }

    // Supprimer un fournisseur
    @DeleteMapping("/fournisseurs/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteFournisseur(@PathVariable Long id) {
        Fournisseur fournisseur = fournisseurRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Fournisseur introuvable avec l'identifiant : " + id));
        fournisseurRepo.delete(fournisseur);
        Map<String, Boolean> response = new HashMap<>();
        response.put("supprimé avec succès", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

    // Mettre à jour un fournisseur
    @PutMapping("/fournisseurs/{id}")
    public ResponseEntity<Fournisseur> updateFournisseur(@PathVariable Long id, @RequestBody Fournisseur fournisseurDetails) {
        Fournisseur fournisseur = fournisseurRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Fournisseur introuvable avec l'identifiant : " + id));

        fournisseur.setNom(fournisseurDetails.getNom());
        fournisseur.setContact(fournisseurDetails.getContact());
        fournisseur.setQualiteService(fournisseurDetails.getQualiteService());
        fournisseur.setNote(fournisseurDetails.getNote());

        Fournisseur updatedFournisseur = fournisseurRepo.save(fournisseur);
        return ResponseEntity.ok(updatedFournisseur);
    }
}
