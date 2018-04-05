package com.mobilechip.erp.service;

import com.mobilechip.erp.service.dto.PurchaseOrderDTO;
import java.util.List;

/**
 * Service Interface for managing PurchaseOrder.
 */
public interface PurchaseOrderService {

    /**
     * Save a purchaseOrder.
     *
     * @param purchaseOrderDTO the entity to save
     * @return the persisted entity
     */
    PurchaseOrderDTO save(PurchaseOrderDTO purchaseOrderDTO);

    /**
     * Get all the purchaseOrders.
     *
     * @return the list of entities
     */
    List<PurchaseOrderDTO> findAll();

    /**
     * Get the "id" purchaseOrder.
     *
     * @param id the id of the entity
     * @return the entity
     */
    PurchaseOrderDTO findOne(Long id);

    /**
     * Delete the "id" purchaseOrder.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
