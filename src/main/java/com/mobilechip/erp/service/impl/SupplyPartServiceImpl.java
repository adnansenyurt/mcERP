package com.mobilechip.erp.service.impl;

import com.mobilechip.erp.service.SupplyPartService;
import com.mobilechip.erp.domain.SupplyPart;
import com.mobilechip.erp.repository.SupplyPartRepository;
import com.mobilechip.erp.service.dto.SupplyPartDTO;
import com.mobilechip.erp.service.mapper.SupplyPartMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing SupplyPart.
 */
@Service
@Transactional
public class SupplyPartServiceImpl implements SupplyPartService {

    private final Logger log = LoggerFactory.getLogger(SupplyPartServiceImpl.class);

    private final SupplyPartRepository supplyPartRepository;

    private final SupplyPartMapper supplyPartMapper;

    public SupplyPartServiceImpl(SupplyPartRepository supplyPartRepository, SupplyPartMapper supplyPartMapper) {
        this.supplyPartRepository = supplyPartRepository;
        this.supplyPartMapper = supplyPartMapper;
    }

    /**
     * Save a supplyPart.
     *
     * @param supplyPartDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public SupplyPartDTO save(SupplyPartDTO supplyPartDTO) {
        log.debug("Request to save SupplyPart : {}", supplyPartDTO);
        SupplyPart supplyPart = supplyPartMapper.toEntity(supplyPartDTO);
        supplyPart = supplyPartRepository.save(supplyPart);
        return supplyPartMapper.toDto(supplyPart);
    }

    /**
     * Get all the supplyParts.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<SupplyPartDTO> findAll() {
        log.debug("Request to get all SupplyParts");
        return supplyPartRepository.findAll().stream()
            .map(supplyPartMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one supplyPart by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public SupplyPartDTO findOne(Long id) {
        log.debug("Request to get SupplyPart : {}", id);
        SupplyPart supplyPart = supplyPartRepository.findOne(id);
        return supplyPartMapper.toDto(supplyPart);
    }

    /**
     * Delete the supplyPart by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete SupplyPart : {}", id);
        supplyPartRepository.delete(id);
    }
}
