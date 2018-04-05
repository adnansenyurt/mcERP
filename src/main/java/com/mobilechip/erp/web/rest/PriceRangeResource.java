package com.mobilechip.erp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mobilechip.erp.service.PriceRangeService;
import com.mobilechip.erp.web.rest.errors.BadRequestAlertException;
import com.mobilechip.erp.web.rest.util.HeaderUtil;
import com.mobilechip.erp.service.dto.PriceRangeDTO;
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
 * REST controller for managing PriceRange.
 */
@RestController
@RequestMapping("/api")
public class PriceRangeResource {

    private final Logger log = LoggerFactory.getLogger(PriceRangeResource.class);

    private static final String ENTITY_NAME = "priceRange";

    private final PriceRangeService priceRangeService;

    public PriceRangeResource(PriceRangeService priceRangeService) {
        this.priceRangeService = priceRangeService;
    }

    /**
     * POST  /price-ranges : Create a new priceRange.
     *
     * @param priceRangeDTO the priceRangeDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new priceRangeDTO, or with status 400 (Bad Request) if the priceRange has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/price-ranges")
    @Timed
    public ResponseEntity<PriceRangeDTO> createPriceRange(@Valid @RequestBody PriceRangeDTO priceRangeDTO) throws URISyntaxException {
        log.debug("REST request to save PriceRange : {}", priceRangeDTO);
        if (priceRangeDTO.getId() != null) {
            throw new BadRequestAlertException("A new priceRange cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PriceRangeDTO result = priceRangeService.save(priceRangeDTO);
        return ResponseEntity.created(new URI("/api/price-ranges/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /price-ranges : Updates an existing priceRange.
     *
     * @param priceRangeDTO the priceRangeDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated priceRangeDTO,
     * or with status 400 (Bad Request) if the priceRangeDTO is not valid,
     * or with status 500 (Internal Server Error) if the priceRangeDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/price-ranges")
    @Timed
    public ResponseEntity<PriceRangeDTO> updatePriceRange(@Valid @RequestBody PriceRangeDTO priceRangeDTO) throws URISyntaxException {
        log.debug("REST request to update PriceRange : {}", priceRangeDTO);
        if (priceRangeDTO.getId() == null) {
            return createPriceRange(priceRangeDTO);
        }
        PriceRangeDTO result = priceRangeService.save(priceRangeDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, priceRangeDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /price-ranges : get all the priceRanges.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of priceRanges in body
     */
    @GetMapping("/price-ranges")
    @Timed
    public List<PriceRangeDTO> getAllPriceRanges() {
        log.debug("REST request to get all PriceRanges");
        return priceRangeService.findAll();
        }

    /**
     * GET  /price-ranges/:id : get the "id" priceRange.
     *
     * @param id the id of the priceRangeDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the priceRangeDTO, or with status 404 (Not Found)
     */
    @GetMapping("/price-ranges/{id}")
    @Timed
    public ResponseEntity<PriceRangeDTO> getPriceRange(@PathVariable Long id) {
        log.debug("REST request to get PriceRange : {}", id);
        PriceRangeDTO priceRangeDTO = priceRangeService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(priceRangeDTO));
    }

    /**
     * DELETE  /price-ranges/:id : delete the "id" priceRange.
     *
     * @param id the id of the priceRangeDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/price-ranges/{id}")
    @Timed
    public ResponseEntity<Void> deletePriceRange(@PathVariable Long id) {
        log.debug("REST request to delete PriceRange : {}", id);
        priceRangeService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
