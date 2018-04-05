package com.mobilechip.erp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mobilechip.erp.service.SupplyPartContractService;
import com.mobilechip.erp.web.rest.errors.BadRequestAlertException;
import com.mobilechip.erp.web.rest.util.HeaderUtil;
import com.mobilechip.erp.service.dto.SupplyPartContractDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing SupplyPartContract.
 */
@RestController
@RequestMapping("/api")
public class SupplyPartContractResource {

    private final Logger log = LoggerFactory.getLogger(SupplyPartContractResource.class);

    private static final String ENTITY_NAME = "supplyPartContract";

    private final SupplyPartContractService supplyPartContractService;

    public SupplyPartContractResource(SupplyPartContractService supplyPartContractService) {
        this.supplyPartContractService = supplyPartContractService;
    }

    /**
     * POST  /supply-part-contracts : Create a new supplyPartContract.
     *
     * @param supplyPartContractDTO the supplyPartContractDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new supplyPartContractDTO, or with status 400 (Bad Request) if the supplyPartContract has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/supply-part-contracts")
    @Timed
    public ResponseEntity<SupplyPartContractDTO> createSupplyPartContract(@RequestBody SupplyPartContractDTO supplyPartContractDTO) throws URISyntaxException {
        log.debug("REST request to save SupplyPartContract : {}", supplyPartContractDTO);
        if (supplyPartContractDTO.getId() != null) {
            throw new BadRequestAlertException("A new supplyPartContract cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SupplyPartContractDTO result = supplyPartContractService.save(supplyPartContractDTO);
        return ResponseEntity.created(new URI("/api/supply-part-contracts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /supply-part-contracts : Updates an existing supplyPartContract.
     *
     * @param supplyPartContractDTO the supplyPartContractDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated supplyPartContractDTO,
     * or with status 400 (Bad Request) if the supplyPartContractDTO is not valid,
     * or with status 500 (Internal Server Error) if the supplyPartContractDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/supply-part-contracts")
    @Timed
    public ResponseEntity<SupplyPartContractDTO> updateSupplyPartContract(@RequestBody SupplyPartContractDTO supplyPartContractDTO) throws URISyntaxException {
        log.debug("REST request to update SupplyPartContract : {}", supplyPartContractDTO);
        if (supplyPartContractDTO.getId() == null) {
            return createSupplyPartContract(supplyPartContractDTO);
        }
        SupplyPartContractDTO result = supplyPartContractService.save(supplyPartContractDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, supplyPartContractDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /supply-part-contracts : get all the supplyPartContracts.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of supplyPartContracts in body
     */
    @GetMapping("/supply-part-contracts")
    @Timed
    public List<SupplyPartContractDTO> getAllSupplyPartContracts() {
        log.debug("REST request to get all SupplyPartContracts");
        return supplyPartContractService.findAll();
        }

    /**
     * GET  /supply-part-contracts/:id : get the "id" supplyPartContract.
     *
     * @param id the id of the supplyPartContractDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the supplyPartContractDTO, or with status 404 (Not Found)
     */
    @GetMapping("/supply-part-contracts/{id}")
    @Timed
    public ResponseEntity<SupplyPartContractDTO> getSupplyPartContract(@PathVariable Long id) {
        log.debug("REST request to get SupplyPartContract : {}", id);
        SupplyPartContractDTO supplyPartContractDTO = supplyPartContractService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(supplyPartContractDTO));
    }

    /**
     * DELETE  /supply-part-contracts/:id : delete the "id" supplyPartContract.
     *
     * @param id the id of the supplyPartContractDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/supply-part-contracts/{id}")
    @Timed
    public ResponseEntity<Void> deleteSupplyPartContract(@PathVariable Long id) {
        log.debug("REST request to delete SupplyPartContract : {}", id);
        supplyPartContractService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
