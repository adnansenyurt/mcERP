package com.mobilechip.erp.service.impl;

import com.mobilechip.erp.service.ProductService;
import com.mobilechip.erp.domain.Product;
import com.mobilechip.erp.repository.ProductRepository;
import com.mobilechip.erp.service.dto.ProductDTO;
import com.mobilechip.erp.service.mapper.ProductMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * Service Implementation for managing Product.
 */
@Service
@Transactional
public class ProductServiceImpl implements ProductService {

    private final Logger log = LoggerFactory.getLogger(ProductServiceImpl.class);

    private final ProductRepository productRepository;

    private final ProductMapper productMapper;

    public ProductServiceImpl(ProductRepository productRepository, ProductMapper productMapper) {
        this.productRepository = productRepository;
        this.productMapper = productMapper;
    }

    /**
     * Save a product.
     *
     * @param productDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public ProductDTO save(ProductDTO productDTO) {
        log.debug("Request to save Product : {}", productDTO);
        Product product = productMapper.toEntity(productDTO);
        product = productRepository.save(product);
        return productMapper.toDto(product);
    }

    /**
     * Get all the products.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<ProductDTO> findAll() {
        log.debug("Request to get all Products");
        return productRepository.findAll().stream()
            .map(productMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     *  get all the products where Bom is null.
     *  @return the list of entities
     */
    @Transactional(readOnly = true) 
    public List<ProductDTO> findAllWhereBomIsNull() {
        log.debug("Request to get all products where Bom is null");
        return StreamSupport
            .stream(productRepository.findAll().spliterator(), false)
            .filter(product -> product.getBom() == null)
            .map(productMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one product by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public ProductDTO findOne(Long id) {
        log.debug("Request to get Product : {}", id);
        Product product = productRepository.findOne(id);
        return productMapper.toDto(product);
    }

    /**
     * Delete the product by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Product : {}", id);
        productRepository.delete(id);
    }
}
