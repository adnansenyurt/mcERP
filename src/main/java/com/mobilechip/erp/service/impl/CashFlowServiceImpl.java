package com.mobilechip.erp.service.impl;

import com.mobilechip.erp.service.CashFlowService;
import com.mobilechip.erp.domain.CashFlow;
import com.mobilechip.erp.repository.CashFlowRepository;
import com.mobilechip.erp.service.dto.CashFlowDTO;
import com.mobilechip.erp.service.mapper.CashFlowMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing CashFlow.
 */
@Service
@Transactional
public class CashFlowServiceImpl implements CashFlowService {

    private final Logger log = LoggerFactory.getLogger(CashFlowServiceImpl.class);

    private final CashFlowRepository cashFlowRepository;

    private final CashFlowMapper cashFlowMapper;

    public CashFlowServiceImpl(CashFlowRepository cashFlowRepository, CashFlowMapper cashFlowMapper) {
        this.cashFlowRepository = cashFlowRepository;
        this.cashFlowMapper = cashFlowMapper;
    }

    /**
     * Save a cashFlow.
     *
     * @param cashFlowDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public CashFlowDTO save(CashFlowDTO cashFlowDTO) {
        log.debug("Request to save CashFlow : {}", cashFlowDTO);
        CashFlow cashFlow = cashFlowMapper.toEntity(cashFlowDTO);
        cashFlow = cashFlowRepository.save(cashFlow);
        return cashFlowMapper.toDto(cashFlow);
    }

    /**
     * Get all the cashFlows.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<CashFlowDTO> findAll() {
        log.debug("Request to get all CashFlows");
        return cashFlowRepository.findAll().stream()
            .map(cashFlowMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one cashFlow by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public CashFlowDTO findOne(Long id) {
        log.debug("Request to get CashFlow : {}", id);
        CashFlow cashFlow = cashFlowRepository.findOne(id);
        return cashFlowMapper.toDto(cashFlow);
    }

    /**
     * Delete the cashFlow by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete CashFlow : {}", id);
        cashFlowRepository.delete(id);
    }
}
