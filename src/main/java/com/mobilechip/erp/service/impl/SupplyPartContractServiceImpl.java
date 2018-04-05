package com.mobilechip.erp.service.impl;

import com.mobilechip.erp.service.SupplyPartContractService;
import com.mobilechip.erp.domain.SupplyPartContract;
import com.mobilechip.erp.repository.SupplyPartContractRepository;
import com.mobilechip.erp.service.dto.SupplyPartContractDTO;
import com.mobilechip.erp.service.mapper.SupplyPartContractMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing SupplyPartContract.
 */
@Service
@Transactional
public class SupplyPartContractServiceImpl implements SupplyPartContractService {

    private final Logger log = LoggerFactory.getLogger(SupplyPartContractServiceImpl.class);

    private final SupplyPartContractRepository supplyPartContractRepository;

    private final SupplyPartContractMapper supplyPartContractMapper;

    public SupplyPartContractServiceImpl(SupplyPartContractRepository supplyPartContractRepository, SupplyPartContractMapper supplyPartContractMapper) {
        this.supplyPartContractRepository = supplyPartContractRepository;
        this.supplyPartContractMapper = supplyPartContractMapper;
    }

    /**
     * Save a supplyPartContract.
     *
     * @param supplyPartContractDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public SupplyPartContractDTO save(SupplyPartContractDTO supplyPartContractDTO) {
        log.debug("Request to save SupplyPartContract : {}", supplyPartContractDTO);
        SupplyPartContract supplyPartContract = supplyPartContractMapper.toEntity(supplyPartContractDTO);
        supplyPartContract = supplyPartContractRepository.save(supplyPartContract);
        return supplyPartContractMapper.toDto(supplyPartContract);
    }

    /**
     * Get all the supplyPartContracts.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<SupplyPartContractDTO> findAll() {
        log.debug("Request to get all SupplyPartContracts");
        return supplyPartContractRepository.findAll().stream()
            .map(supplyPartContractMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one supplyPartContract by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public SupplyPartContractDTO findOne(Long id) {
        log.debug("Request to get SupplyPartContract : {}", id);
        SupplyPartContract supplyPartContract = supplyPartContractRepository.findOne(id);
        return supplyPartContractMapper.toDto(supplyPartContract);
    }

    /**
     * Delete the supplyPartContract by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete SupplyPartContract : {}", id);
        supplyPartContractRepository.delete(id);
    }
}
