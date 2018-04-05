package com.mobilechip.erp.repository;

import com.mobilechip.erp.domain.ProductStock;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the ProductStock entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProductStockRepository extends JpaRepository<ProductStock, Long> {

}
