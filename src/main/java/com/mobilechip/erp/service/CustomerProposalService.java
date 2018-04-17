package com.mobilechip.erp.service;

import com.mobilechip.erp.service.dto.CustomerProposalDTO;
import java.util.List;

/**
 * Service Interface for managing CustomerProposal.
 */
public interface CustomerProposalService {

    /**
     * Save a customerProposal.
     *
     * @param customerProposalDTO the entity to save
     * @return the persisted entity
     */
    CustomerProposalDTO save(CustomerProposalDTO customerProposalDTO);

    /**
     * Get all the customerProposals.
     *
     * @return the list of entities
     */
    List<CustomerProposalDTO> findAll();
    /**
     * Get all the CustomerProposalDTO where CustomerOrder is null.
     *
     * @return the list of entities
     */
    List<CustomerProposalDTO> findAllWhereCustomerOrderIsNull();

    /**
     * Get the "id" customerProposal.
     *
     * @param id the id of the entity
     * @return the entity
     */
    CustomerProposalDTO findOne(Long id);

    /**
     * Delete the "id" customerProposal.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
