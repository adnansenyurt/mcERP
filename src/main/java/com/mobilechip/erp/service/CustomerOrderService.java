package com.mobilechip.erp.service;

import com.mobilechip.erp.service.dto.CustomerOrderDTO;
import java.util.List;

/**
 * Service Interface for managing CustomerOrder.
 */
public interface CustomerOrderService {

    /**
     * Save a customerOrder.
     *
     * @param customerOrderDTO the entity to save
     * @return the persisted entity
     */
    CustomerOrderDTO save(CustomerOrderDTO customerOrderDTO);

    /**
     * Get all the customerOrders.
     *
     * @return the list of entities
     */
    List<CustomerOrderDTO> findAll();

    /**
     * Get the "id" customerOrder.
     *
     * @param id the id of the entity
     * @return the entity
     */
    CustomerOrderDTO findOne(Long id);

    /**
     * Delete the "id" customerOrder.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
