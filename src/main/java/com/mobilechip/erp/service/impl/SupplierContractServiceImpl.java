package com.mobilechip.erp.service.impl;

import com.mobilechip.erp.service.SupplierContractService;
import com.mobilechip.erp.domain.SupplierContract;
import com.mobilechip.erp.repository.SupplierContractRepository;
import com.mobilechip.erp.service.dto.SupplierContractDTO;
import com.mobilechip.erp.service.mapper.SupplierContractMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing SupplierContract.
 */
@Service
@Transactional
public class SupplierContractServiceImpl implements SupplierContractService {

    private final Logger log = LoggerFactory.getLogger(SupplierContractServiceImpl.class);

    private final SupplierContractRepository supplierContractRepository;

    private final SupplierContractMapper supplierContractMapper;

    public SupplierContractServiceImpl(SupplierContractRepository supplierContractRepository, SupplierContractMapper supplierContractMapper) {
        this.supplierContractRepository = supplierContractRepository;
        this.supplierContractMapper = supplierContractMapper;
    }

    /**
     * Save a supplierContract.
     *
     * @param supplierContractDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public SupplierContractDTO save(SupplierContractDTO supplierContractDTO) {
        log.debug("Request to save SupplierContract : {}", supplierContractDTO);
        SupplierContract supplierContract = supplierContractMapper.toEntity(supplierContractDTO);
        supplierContract = supplierContractRepository.save(supplierContract);
        return supplierContractMapper.toDto(supplierContract);
    }

    /**
     * Get all the supplierContracts.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<SupplierContractDTO> findAll() {
        log.debug("Request to get all SupplierContracts");
        return supplierContractRepository.findAll().stream()
            .map(supplierContractMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one supplierContract by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public SupplierContractDTO findOne(Long id) {
        log.debug("Request to get SupplierContract : {}", id);
        SupplierContract supplierContract = supplierContractRepository.findOne(id);
        return supplierContractMapper.toDto(supplierContract);
    }

    /**
     * Delete the supplierContract by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete SupplierContract : {}", id);
        supplierContractRepository.delete(id);
    }
}
