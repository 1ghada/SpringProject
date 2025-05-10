package tn.itbs.erp.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.itbs.erp.Models.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
	 Optional<User> findByEmail(String email);
	    
	    // Méthode pour rechercher un utilisateur par nom d'utilisateur (si nécessaire)
	    Optional<User> findByUsername(String username);
    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);
}
