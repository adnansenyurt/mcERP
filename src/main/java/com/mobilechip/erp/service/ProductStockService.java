package com.mobilechip.erp.service;

import com.mobilechip.erp.service.dto.ProductStockDTO;
import java.util.List;

/**
 * Service Interface for managing ProductStock.
 */
public interface ProductStockService {

    /**
     * Save a productStock.
     *
     * @param productStockDTO the entity to save
     * @return the persisted entity
     */
    ProductStockDTO save(ProductStockDTO productStockDTO);

    /**
     * Get all the productStocks.
     *
     * @return the list of entities
     */
    List<ProductStockDTO> findAll();

    /**
     * Get the "id" productStock.
     *
     * @param id the id of the entity
     * @return the entity
     */
    ProductStockDTO findOne(Long id);

    /**
     * Delete the "id" productStock.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
