package com.mobilechip.erp.service;

import com.mobilechip.erp.service.dto.SupplyPartContractDTO;
import java.util.List;

/**
 * Service Interface for managing SupplyPartContract.
 */
public interface SupplyPartContractService {

    /**
     * Save a supplyPartContract.
     *
     * @param supplyPartContractDTO the entity to save
     * @return the persisted entity
     */
    SupplyPartContractDTO save(SupplyPartContractDTO supplyPartContractDTO);

    /**
     * Get all the supplyPartContracts.
     *
     * @return the list of entities
     */
    List<SupplyPartContractDTO> findAll();

    /**
     * Get the "id" supplyPartContract.
     *
     * @param id the id of the entity
     * @return the entity
     */
    SupplyPartContractDTO findOne(Long id);

    /**
     * Delete the "id" supplyPartContract.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
