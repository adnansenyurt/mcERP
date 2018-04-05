package com.mobilechip.erp.repository;

import com.mobilechip.erp.domain.CustomerProposal;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the CustomerProposal entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CustomerProposalRepository extends JpaRepository<CustomerProposal, Long> {

}
