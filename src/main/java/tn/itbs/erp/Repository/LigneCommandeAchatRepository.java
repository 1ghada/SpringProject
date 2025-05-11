package tn.itbs.erp.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import tn.itbs.erp.Models.LigneCommandeAchat;

@Repository
public interface LigneCommandeAchatRepository extends JpaRepository<LigneCommandeAchat, Long> {
	List<LigneCommandeAchat> findByCommandeStatutNot(String statut);

}