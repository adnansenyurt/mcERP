package com.mobilechip.erp.service;

import com.mobilechip.erp.service.dto.SupplyStockDTO;
import java.util.List;

/**
 * Service Interface for managing SupplyStock.
 */
public interface SupplyStockService {

    /**
     * Save a supplyStock.
     *
     * @param supplyStockDTO the entity to save
     * @return the persisted entity
     */
    SupplyStockDTO save(SupplyStockDTO supplyStockDTO);

    /**
     * Get all the supplyStocks.
     *
     * @return the list of entities
     */
    List<SupplyStockDTO> findAll();

    /**
     * Get the "id" supplyStock.
     *
     * @param id the id of the entity
     * @return the entity
     */
    SupplyStockDTO findOne(Long id);

    /**
     * Delete the "id" supplyStock.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
