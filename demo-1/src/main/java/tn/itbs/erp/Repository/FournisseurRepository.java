package tn.itbs.erp.Repository;
import tn.itbs.erp.Models.Fournisseur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface FournisseurRepository extends JpaRepository<Fournisseur, Long> {
}
