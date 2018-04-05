package com.mobilechip.erp.service;

import com.mobilechip.erp.service.dto.PriceRangeDTO;
import java.util.List;

/**
 * Service Interface for managing PriceRange.
 */
public interface PriceRangeService {

    /**
     * Save a priceRange.
     *
     * @param priceRangeDTO the entity to save
     * @return the persisted entity
     */
    PriceRangeDTO save(PriceRangeDTO priceRangeDTO);

    /**
     * Get all the priceRanges.
     *
     * @return the list of entities
     */
    List<PriceRangeDTO> findAll();

    /**
     * Get the "id" priceRange.
     *
     * @param id the id of the entity
     * @return the entity
     */
    PriceRangeDTO findOne(Long id);

    /**
     * Delete the "id" priceRange.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
