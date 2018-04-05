package com.mobilechip.erp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mobilechip.erp.service.SupplyStockService;
import com.mobilechip.erp.web.rest.errors.BadRequestAlertException;
import com.mobilechip.erp.web.rest.util.HeaderUtil;
import com.mobilechip.erp.service.dto.SupplyStockDTO;
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
 * REST controller for managing SupplyStock.
 */
@RestController
@RequestMapping("/api")
public class SupplyStockResource {

    private final Logger log = LoggerFactory.getLogger(SupplyStockResource.class);

    private static final String ENTITY_NAME = "supplyStock";

    private final SupplyStockService supplyStockService;

    public SupplyStockResource(SupplyStockService supplyStockService) {
        this.supplyStockService = supplyStockService;
    }

    /**
     * POST  /supply-stocks : Create a new supplyStock.
     *
     * @param supplyStockDTO the supplyStockDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new supplyStockDTO, or with status 400 (Bad Request) if the supplyStock has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/supply-stocks")
    @Timed
    public ResponseEntity<SupplyStockDTO> createSupplyStock(@Valid @RequestBody SupplyStockDTO supplyStockDTO) throws URISyntaxException {
        log.debug("REST request to save SupplyStock : {}", supplyStockDTO);
        if (supplyStockDTO.getId() != null) {
            throw new BadRequestAlertException("A new supplyStock cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SupplyStockDTO result = supplyStockService.save(supplyStockDTO);
        return ResponseEntity.created(new URI("/api/supply-stocks/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /supply-stocks : Updates an existing supplyStock.
     *
     * @param supplyStockDTO the supplyStockDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated supplyStockDTO,
     * or with status 400 (Bad Request) if the supplyStockDTO is not valid,
     * or with status 500 (Internal Server Error) if the supplyStockDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/supply-stocks")
    @Timed
    public ResponseEntity<SupplyStockDTO> updateSupplyStock(@Valid @RequestBody SupplyStockDTO supplyStockDTO) throws URISyntaxException {
        log.debug("REST request to update SupplyStock : {}", supplyStockDTO);
        if (supplyStockDTO.getId() == null) {
            return createSupplyStock(supplyStockDTO);
        }
        SupplyStockDTO result = supplyStockService.save(supplyStockDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, supplyStockDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /supply-stocks : get all the supplyStocks.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of supplyStocks in body
     */
    @GetMapping("/supply-stocks")
    @Timed
    public List<SupplyStockDTO> getAllSupplyStocks() {
        log.debug("REST request to get all SupplyStocks");
        return supplyStockService.findAll();
        }

    /**
     * GET  /supply-stocks/:id : get the "id" supplyStock.
     *
     * @param id the id of the supplyStockDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the supplyStockDTO, or with status 404 (Not Found)
     */
    @GetMapping("/supply-stocks/{id}")
    @Timed
    public ResponseEntity<SupplyStockDTO> getSupplyStock(@PathVariable Long id) {
        log.debug("REST request to get SupplyStock : {}", id);
        SupplyStockDTO supplyStockDTO = supplyStockService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(supplyStockDTO));
    }

    /**
     * DELETE  /supply-stocks/:id : delete the "id" supplyStock.
     *
     * @param id the id of the supplyStockDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/supply-stocks/{id}")
    @Timed
    public ResponseEntity<Void> deleteSupplyStock(@PathVariable Long id) {
        log.debug("REST request to delete SupplyStock : {}", id);
        supplyStockService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
