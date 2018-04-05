package com.mobilechip.erp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mobilechip.erp.service.SupplierContractService;
import com.mobilechip.erp.web.rest.errors.BadRequestAlertException;
import com.mobilechip.erp.web.rest.util.HeaderUtil;
import com.mobilechip.erp.service.dto.SupplierContractDTO;
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
 * REST controller for managing SupplierContract.
 */
@RestController
@RequestMapping("/api")
public class SupplierContractResource {

    private final Logger log = LoggerFactory.getLogger(SupplierContractResource.class);

    private static final String ENTITY_NAME = "supplierContract";

    private final SupplierContractService supplierContractService;

    public SupplierContractResource(SupplierContractService supplierContractService) {
        this.supplierContractService = supplierContractService;
    }

    /**
     * POST  /supplier-contracts : Create a new supplierContract.
     *
     * @param supplierContractDTO the supplierContractDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new supplierContractDTO, or with status 400 (Bad Request) if the supplierContract has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/supplier-contracts")
    @Timed
    public ResponseEntity<SupplierContractDTO> createSupplierContract(@Valid @RequestBody SupplierContractDTO supplierContractDTO) throws URISyntaxException {
        log.debug("REST request to save SupplierContract : {}", supplierContractDTO);
        if (supplierContractDTO.getId() != null) {
            throw new BadRequestAlertException("A new supplierContract cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SupplierContractDTO result = supplierContractService.save(supplierContractDTO);
        return ResponseEntity.created(new URI("/api/supplier-contracts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /supplier-contracts : Updates an existing supplierContract.
     *
     * @param supplierContractDTO the supplierContractDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated supplierContractDTO,
     * or with status 400 (Bad Request) if the supplierContractDTO is not valid,
     * or with status 500 (Internal Server Error) if the supplierContractDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/supplier-contracts")
    @Timed
    public ResponseEntity<SupplierContractDTO> updateSupplierContract(@Valid @RequestBody SupplierContractDTO supplierContractDTO) throws URISyntaxException {
        log.debug("REST request to update SupplierContract : {}", supplierContractDTO);
        if (supplierContractDTO.getId() == null) {
            return createSupplierContract(supplierContractDTO);
        }
        SupplierContractDTO result = supplierContractService.save(supplierContractDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, supplierContractDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /supplier-contracts : get all the supplierContracts.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of supplierContracts in body
     */
    @GetMapping("/supplier-contracts")
    @Timed
    public List<SupplierContractDTO> getAllSupplierContracts() {
        log.debug("REST request to get all SupplierContracts");
        return supplierContractService.findAll();
        }

    /**
     * GET  /supplier-contracts/:id : get the "id" supplierContract.
     *
     * @param id the id of the supplierContractDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the supplierContractDTO, or with status 404 (Not Found)
     */
    @GetMapping("/supplier-contracts/{id}")
    @Timed
    public ResponseEntity<SupplierContractDTO> getSupplierContract(@PathVariable Long id) {
        log.debug("REST request to get SupplierContract : {}", id);
        SupplierContractDTO supplierContractDTO = supplierContractService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(supplierContractDTO));
    }

    /**
     * DELETE  /supplier-contracts/:id : delete the "id" supplierContract.
     *
     * @param id the id of the supplierContractDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/supplier-contracts/{id}")
    @Timed
    public ResponseEntity<Void> deleteSupplierContract(@PathVariable Long id) {
        log.debug("REST request to delete SupplierContract : {}", id);
        supplierContractService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
