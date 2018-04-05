package com.mobilechip.erp.repository;

import com.mobilechip.erp.domain.SupplierContract;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the SupplierContract entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SupplierContractRepository extends JpaRepository<SupplierContract, Long> {

}
