package com.mobilechip.erp.service;

import com.mobilechip.erp.service.dto.OpportunityDTO;
import java.util.List;

/**
 * Service Interface for managing Opportunity.
 */
public interface OpportunityService {

    /**
     * Save a opportunity.
     *
     * @param opportunityDTO the entity to save
     * @return the persisted entity
     */
    OpportunityDTO save(OpportunityDTO opportunityDTO);

    /**
     * Get all the opportunities.
     *
     * @return the list of entities
     */
    List<OpportunityDTO> findAll();

    /**
     * Get the "id" opportunity.
     *
     * @param id the id of the entity
     * @return the entity
     */
    OpportunityDTO findOne(Long id);

    /**
     * Delete the "id" opportunity.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
