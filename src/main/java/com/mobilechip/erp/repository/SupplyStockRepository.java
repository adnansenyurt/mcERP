package com.mobilechip.erp.repository;

import com.mobilechip.erp.domain.SupplyStock;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the SupplyStock entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SupplyStockRepository extends JpaRepository<SupplyStock, Long> {

}
