package com.mobilechip.erp.service;

import com.mobilechip.erp.service.dto.CashFlowDTO;
import java.util.List;

/**
 * Service Interface for managing CashFlow.
 */
public interface CashFlowService {

    /**
     * Save a cashFlow.
     *
     * @param cashFlowDTO the entity to save
     * @return the persisted entity
     */
    CashFlowDTO save(CashFlowDTO cashFlowDTO);

    /**
     * Get all the cashFlows.
     *
     * @return the list of entities
     */
    List<CashFlowDTO> findAll();

    /**
     * Get the "id" cashFlow.
     *
     * @param id the id of the entity
     * @return the entity
     */
    CashFlowDTO findOne(Long id);

    /**
     * Delete the "id" cashFlow.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
