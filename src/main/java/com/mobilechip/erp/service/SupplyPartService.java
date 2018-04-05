package com.mobilechip.erp.service;

import com.mobilechip.erp.service.dto.SupplyPartDTO;
import java.util.List;

/**
 * Service Interface for managing SupplyPart.
 */
public interface SupplyPartService {

    /**
     * Save a supplyPart.
     *
     * @param supplyPartDTO the entity to save
     * @return the persisted entity
     */
    SupplyPartDTO save(SupplyPartDTO supplyPartDTO);

    /**
     * Get all the supplyParts.
     *
     * @return the list of entities
     */
    List<SupplyPartDTO> findAll();

    /**
     * Get the "id" supplyPart.
     *
     * @param id the id of the entity
     * @return the entity
     */
    SupplyPartDTO findOne(Long id);

    /**
     * Delete the "id" supplyPart.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
