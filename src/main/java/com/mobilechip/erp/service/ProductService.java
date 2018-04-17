package com.mobilechip.erp.service;

import com.mobilechip.erp.service.dto.ProductDTO;
import java.util.List;

/**
 * Service Interface for managing Product.
 */
public interface ProductService {

    /**
     * Save a product.
     *
     * @param productDTO the entity to save
     * @return the persisted entity
     */
    ProductDTO save(ProductDTO productDTO);

    /**
     * Get all the products.
     *
     * @return the list of entities
     */
    List<ProductDTO> findAll();
    /**
     * Get all the ProductDTO where Bom is null.
     *
     * @return the list of entities
     */
    List<ProductDTO> findAllWhereBomIsNull();

    /**
     * Get the "id" product.
     *
     * @param id the id of the entity
     * @return the entity
     */
    ProductDTO findOne(Long id);

    /**
     * Delete the "id" product.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
