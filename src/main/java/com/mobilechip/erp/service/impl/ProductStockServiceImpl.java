package com.mobilechip.erp.service.impl;

import com.mobilechip.erp.service.ProductStockService;
import com.mobilechip.erp.domain.ProductStock;
import com.mobilechip.erp.repository.ProductStockRepository;
import com.mobilechip.erp.service.dto.ProductStockDTO;
import com.mobilechip.erp.service.mapper.ProductStockMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing ProductStock.
 */
@Service
@Transactional
public class ProductStockServiceImpl implements ProductStockService {

    private final Logger log = LoggerFactory.getLogger(ProductStockServiceImpl.class);

    private final ProductStockRepository productStockRepository;

    private final ProductStockMapper productStockMapper;

    public ProductStockServiceImpl(ProductStockRepository productStockRepository, ProductStockMapper productStockMapper) {
        this.productStockRepository = productStockRepository;
        this.productStockMapper = productStockMapper;
    }

    /**
     * Save a productStock.
     *
     * @param productStockDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public ProductStockDTO save(ProductStockDTO productStockDTO) {
        log.debug("Request to save ProductStock : {}", productStockDTO);
        ProductStock productStock = productStockMapper.toEntity(productStockDTO);
        productStock = productStockRepository.save(productStock);
        return productStockMapper.toDto(productStock);
    }

    /**
     * Get all the productStocks.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<ProductStockDTO> findAll() {
        log.debug("Request to get all ProductStocks");
        return productStockRepository.findAll().stream()
            .map(productStockMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one productStock by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public ProductStockDTO findOne(Long id) {
        log.debug("Request to get ProductStock : {}", id);
        ProductStock productStock = productStockRepository.findOne(id);
        return productStockMapper.toDto(productStock);
    }

    /**
     * Delete the productStock by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete ProductStock : {}", id);
        productStockRepository.delete(id);
    }
}
