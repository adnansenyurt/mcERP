package com.mobilechip.erp.repository;

import com.mobilechip.erp.domain.SupplyPart;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the SupplyPart entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SupplyPartRepository extends JpaRepository<SupplyPart, Long> {

}
