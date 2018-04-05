package com.mobilechip.erp.repository;

import com.mobilechip.erp.domain.BillOfMaterials;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the BillOfMaterials entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BillOfMaterialsRepository extends JpaRepository<BillOfMaterials, Long> {

}
