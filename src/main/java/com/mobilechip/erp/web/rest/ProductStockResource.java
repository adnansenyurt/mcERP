package com.mobilechip.erp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mobilechip.erp.service.ProductStockService;
import com.mobilechip.erp.web.rest.errors.BadRequestAlertException;
import com.mobilechip.erp.web.rest.util.HeaderUtil;
import com.mobilechip.erp.service.dto.ProductStockDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing ProductStock.
 */
@RestController
@RequestMapping("/api")
public class ProductStockResource {

    private final Logger log = LoggerFactory.getLogger(ProductStockResource.class);

    private static final String ENTITY_NAME = "productStock";

    private final ProductStockService productStockService;

    public ProductStockResource(ProductStockService productStockService) {
        this.productStockService = productStockService;
    }

    /**
     * POST  /product-stocks : Create a new productStock.
     *
     * @param productStockDTO the productStockDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new productStockDTO, or with status 400 (Bad Request) if the productStock has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/product-stocks")
    @Timed
    public ResponseEntity<ProductStockDTO> createProductStock(@Valid @RequestBody ProductStockDTO productStockDTO) throws URISyntaxException {
        log.debug("REST request to save ProductStock : {}", productStockDTO);
        if (productStockDTO.getId() != null) {
            throw new BadRequestAlertException("A new productStock cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ProductStockDTO result = productStockService.save(productStockDTO);
        return ResponseEntity.created(new URI("/api/product-stocks/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /product-stocks : Updates an existing productStock.
     *
     * @param productStockDTO the productStockDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated productStockDTO,
     * or with status 400 (Bad Request) if the productStockDTO is not valid,
     * or with status 500 (Internal Server Error) if the productStockDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/product-stocks")
    @Timed
    public ResponseEntity<ProductStockDTO> updateProductStock(@Valid @RequestBody ProductStockDTO productStockDTO) throws URISyntaxException {
        log.debug("REST request to update ProductStock : {}", productStockDTO);
        if (productStockDTO.getId() == null) {
            return createProductStock(productStockDTO);
        }
        ProductStockDTO result = productStockService.save(productStockDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, productStockDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /product-stocks : get all the productStocks.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of productStocks in body
     */
    @GetMapping("/product-stocks")
    @Timed
    public List<ProductStockDTO> getAllProductStocks() {
        log.debug("REST request to get all ProductStocks");
        return productStockService.findAll();
        }

    /**
     * GET  /product-stocks/:id : get the "id" productStock.
     *
     * @param id the id of the productStockDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the productStockDTO, or with status 404 (Not Found)
     */
    @GetMapping("/product-stocks/{id}")
    @Timed
    public ResponseEntity<ProductStockDTO> getProductStock(@PathVariable Long id) {
        log.debug("REST request to get ProductStock : {}", id);
        ProductStockDTO productStockDTO = productStockService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(productStockDTO));
    }

    /**
     * DELETE  /product-stocks/:id : delete the "id" productStock.
     *
     * @param id the id of the productStockDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/product-stocks/{id}")
    @Timed
    public ResponseEntity<Void> deleteProductStock(@PathVariable Long id) {
        log.debug("REST request to delete ProductStock : {}", id);
        productStockService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
