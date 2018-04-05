package com.mobilechip.erp.service.impl;

import com.mobilechip.erp.service.CustomerProposalService;
import com.mobilechip.erp.domain.CustomerProposal;
import com.mobilechip.erp.repository.CustomerProposalRepository;
import com.mobilechip.erp.service.dto.CustomerProposalDTO;
import com.mobilechip.erp.service.mapper.CustomerProposalMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing CustomerProposal.
 */
@Service
@Transactional
public class CustomerProposalServiceImpl implements CustomerProposalService {

    private final Logger log = LoggerFactory.getLogger(CustomerProposalServiceImpl.class);

    private final CustomerProposalRepository customerProposalRepository;

    private final CustomerProposalMapper customerProposalMapper;

    public CustomerProposalServiceImpl(CustomerProposalRepository customerProposalRepository, CustomerProposalMapper customerProposalMapper) {
        this.customerProposalRepository = customerProposalRepository;
        this.customerProposalMapper = customerProposalMapper;
    }

    /**
     * Save a customerProposal.
     *
     * @param customerProposalDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public CustomerProposalDTO save(CustomerProposalDTO customerProposalDTO) {
        log.debug("Request to save CustomerProposal : {}", customerProposalDTO);
        CustomerProposal customerProposal = customerProposalMapper.toEntity(customerProposalDTO);
        customerProposal = customerProposalRepository.save(customerProposal);
        return customerProposalMapper.toDto(customerProposal);
    }

    /**
     * Get all the customerProposals.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<CustomerProposalDTO> findAll() {
        log.debug("Request to get all CustomerProposals");
        return customerProposalRepository.findAll().stream()
            .map(customerProposalMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one customerProposal by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public CustomerProposalDTO findOne(Long id) {
        log.debug("Request to get CustomerProposal : {}", id);
        CustomerProposal customerProposal = customerProposalRepository.findOne(id);
        return customerProposalMapper.toDto(customerProposal);
    }

    /**
     * Delete the customerProposal by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete CustomerProposal : {}", id);
        customerProposalRepository.delete(id);
    }
}
