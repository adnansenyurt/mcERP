package com.mobilechip.erp.service.impl;

import com.mobilechip.erp.service.SupplyStockService;
import com.mobilechip.erp.domain.SupplyStock;
import com.mobilechip.erp.repository.SupplyStockRepository;
import com.mobilechip.erp.service.dto.SupplyStockDTO;
import com.mobilechip.erp.service.mapper.SupplyStockMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing SupplyStock.
 */
@Service
@Transactional
public class SupplyStockServiceImpl implements SupplyStockService {

    private final Logger log = LoggerFactory.getLogger(SupplyStockServiceImpl.class);

    private final SupplyStockRepository supplyStockRepository;

    private final SupplyStockMapper supplyStockMapper;

    public SupplyStockServiceImpl(SupplyStockRepository supplyStockRepository, SupplyStockMapper supplyStockMapper) {
        this.supplyStockRepository = supplyStockRepository;
        this.supplyStockMapper = supplyStockMapper;
    }

    /**
     * Save a supplyStock.
     *
     * @param supplyStockDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public SupplyStockDTO save(SupplyStockDTO supplyStockDTO) {
        log.debug("Request to save SupplyStock : {}", supplyStockDTO);
        SupplyStock supplyStock = supplyStockMapper.toEntity(supplyStockDTO);
        supplyStock = supplyStockRepository.save(supplyStock);
        return supplyStockMapper.toDto(supplyStock);
    }

    /**
     * Get all the supplyStocks.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<SupplyStockDTO> findAll() {
        log.debug("Request to get all SupplyStocks");
        return supplyStockRepository.findAll().stream()
            .map(supplyStockMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one supplyStock by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public SupplyStockDTO findOne(Long id) {
        log.debug("Request to get SupplyStock : {}", id);
        SupplyStock supplyStock = supplyStockRepository.findOne(id);
        return supplyStockMapper.toDto(supplyStock);
    }

    /**
     * Delete the supplyStock by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete SupplyStock : {}", id);
        supplyStockRepository.delete(id);
    }
}
