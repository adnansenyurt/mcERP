package com.mobilechip.erp.repository;

import com.mobilechip.erp.domain.SupplyPartContract;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the SupplyPartContract entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SupplyPartContractRepository extends JpaRepository<SupplyPartContract, Long> {

}
