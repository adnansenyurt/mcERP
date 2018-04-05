package com.mobilechip.erp.service.impl;

import com.mobilechip.erp.service.OpportunityService;
import com.mobilechip.erp.domain.Opportunity;
import com.mobilechip.erp.repository.OpportunityRepository;
import com.mobilechip.erp.service.dto.OpportunityDTO;
import com.mobilechip.erp.service.mapper.OpportunityMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing Opportunity.
 */
@Service
@Transactional
public class OpportunityServiceImpl implements OpportunityService {

    private final Logger log = LoggerFactory.getLogger(OpportunityServiceImpl.class);

    private final OpportunityRepository opportunityRepository;

    private final OpportunityMapper opportunityMapper;

    public OpportunityServiceImpl(OpportunityRepository opportunityRepository, OpportunityMapper opportunityMapper) {
        this.opportunityRepository = opportunityRepository;
        this.opportunityMapper = opportunityMapper;
    }

    /**
     * Save a opportunity.
     *
     * @param opportunityDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public OpportunityDTO save(OpportunityDTO opportunityDTO) {
        log.debug("Request to save Opportunity : {}", opportunityDTO);
        Opportunity opportunity = opportunityMapper.toEntity(opportunityDTO);
        opportunity = opportunityRepository.save(opportunity);
        return opportunityMapper.toDto(opportunity);
    }

    /**
     * Get all the opportunities.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<OpportunityDTO> findAll() {
        log.debug("Request to get all Opportunities");
        return opportunityRepository.findAll().stream()
            .map(opportunityMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one opportunity by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public OpportunityDTO findOne(Long id) {
        log.debug("Request to get Opportunity : {}", id);
        Opportunity opportunity = opportunityRepository.findOne(id);
        return opportunityMapper.toDto(opportunity);
    }

    /**
     * Delete the opportunity by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Opportunity : {}", id);
        opportunityRepository.delete(id);
    }
}
