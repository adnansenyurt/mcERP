package com.mobilechip.erp.repository;

import com.mobilechip.erp.domain.CashFlow;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the CashFlow entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CashFlowRepository extends JpaRepository<CashFlow, Long> {

}
