package com.mobilechip.erp.service;

import com.mobilechip.erp.service.dto.SupplierContractDTO;
import java.util.List;

/**
 * Service Interface for managing SupplierContract.
 */
public interface SupplierContractService {

    /**
     * Save a supplierContract.
     *
     * @param supplierContractDTO the entity to save
     * @return the persisted entity
     */
    SupplierContractDTO save(SupplierContractDTO supplierContractDTO);

    /**
     * Get all the supplierContracts.
     *
     * @return the list of entities
     */
    List<SupplierContractDTO> findAll();

    /**
     * Get the "id" supplierContract.
     *
     * @param id the id of the entity
     * @return the entity
     */
    SupplierContractDTO findOne(Long id);

    /**
     * Delete the "id" supplierContract.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
