package com.mobilechip.erp.repository;

import com.mobilechip.erp.domain.PriceRange;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the PriceRange entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PriceRangeRepository extends JpaRepository<PriceRange, Long> {

}
