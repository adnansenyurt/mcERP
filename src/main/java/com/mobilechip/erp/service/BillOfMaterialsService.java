package com.mobilechip.erp.service;

import com.mobilechip.erp.service.dto.BillOfMaterialsDTO;
import java.util.List;

/**
 * Service Interface for managing BillOfMaterials.
 */
public interface BillOfMaterialsService {

    /**
     * Save a billOfMaterials.
     *
     * @param billOfMaterialsDTO the entity to save
     * @return the persisted entity
     */
    BillOfMaterialsDTO save(BillOfMaterialsDTO billOfMaterialsDTO);

    /**
     * Get all the billOfMaterials.
     *
     * @return the list of entities
     */
    List<BillOfMaterialsDTO> findAll();

    /**
     * Get the "id" billOfMaterials.
     *
     * @param id the id of the entity
     * @return the entity
     */
    BillOfMaterialsDTO findOne(Long id);

    /**
     * Delete the "id" billOfMaterials.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
