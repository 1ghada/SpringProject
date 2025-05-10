package tn.itbs.erp.Repository;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.itbs.erp.Models.HistoriqueAchat;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;

public interface HistoriqueAchatRepository extends JpaRepository<HistoriqueAchat, Long> {

	Optional<HistoriqueAchat> findByLigneCommandeId(Long ligneCommandeId);

	@Query("SELECT new map(ha.fournisseur.id as id, ha.fournisseur.nom as nom, AVG(ha.delaiLivraison) as delaiMoyen) " +
	       "FROM HistoriqueAchat ha " +
	       "GROUP BY ha.fournisseur.id, ha.fournisseur.nom " +
	       "ORDER BY AVG(ha.delaiLivraison) ASC")
	List<Map<String, Object>> findTop5FournisseursByDelaiLivraisonAsc(Pageable pageable);
}
