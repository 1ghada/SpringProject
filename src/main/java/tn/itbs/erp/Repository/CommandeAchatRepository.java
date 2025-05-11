package tn.itbs.erp.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import tn.itbs.erp.Models.CommandeAchat;

@Repository
public interface CommandeAchatRepository extends JpaRepository<CommandeAchat, Long> {
}
