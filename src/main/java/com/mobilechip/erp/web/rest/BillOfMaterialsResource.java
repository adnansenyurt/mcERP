package com.mobilechip.erp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mobilechip.erp.service.BillOfMaterialsService;
import com.mobilechip.erp.web.rest.errors.BadRequestAlertException;
import com.mobilechip.erp.web.rest.util.HeaderUtil;
import com.mobilechip.erp.service.dto.BillOfMaterialsDTO;
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
 * REST controller for managing BillOfMaterials.
 */
@RestController
@RequestMapping("/api")
public class BillOfMaterialsResource {

    private final Logger log = LoggerFactory.getLogger(BillOfMaterialsResource.class);

    private static final String ENTITY_NAME = "billOfMaterials";

    private final BillOfMaterialsService billOfMaterialsService;

    public BillOfMaterialsResource(BillOfMaterialsService billOfMaterialsService) {
        this.billOfMaterialsService = billOfMaterialsService;
    }

    /**
     * POST  /bill-of-materials : Create a new billOfMaterials.
     *
     * @param billOfMaterialsDTO the billOfMaterialsDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new billOfMaterialsDTO, or with status 400 (Bad Request) if the billOfMaterials has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/bill-of-materials")
    @Timed
    public ResponseEntity<BillOfMaterialsDTO> createBillOfMaterials(@RequestBody BillOfMaterialsDTO billOfMaterialsDTO) throws URISyntaxException {
        log.debug("REST request to save BillOfMaterials : {}", billOfMaterialsDTO);
        if (billOfMaterialsDTO.getId() != null) {
            throw new BadRequestAlertException("A new billOfMaterials cannot already have an ID", ENTITY_NAME, "idexists");
        }
        BillOfMaterialsDTO result = billOfMaterialsService.save(billOfMaterialsDTO);
        return ResponseEntity.created(new URI("/api/bill-of-materials/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /bill-of-materials : Updates an existing billOfMaterials.
     *
     * @param billOfMaterialsDTO the billOfMaterialsDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated billOfMaterialsDTO,
     * or with status 400 (Bad Request) if the billOfMaterialsDTO is not valid,
     * or with status 500 (Internal Server Error) if the billOfMaterialsDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/bill-of-materials")
    @Timed
    public ResponseEntity<BillOfMaterialsDTO> updateBillOfMaterials(@RequestBody BillOfMaterialsDTO billOfMaterialsDTO) throws URISyntaxException {
        log.debug("REST request to update BillOfMaterials : {}", billOfMaterialsDTO);
        if (billOfMaterialsDTO.getId() == null) {
            return createBillOfMaterials(billOfMaterialsDTO);
        }
        BillOfMaterialsDTO result = billOfMaterialsService.save(billOfMaterialsDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, billOfMaterialsDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /bill-of-materials : get all the billOfMaterials.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of billOfMaterials in body
     */
    @GetMapping("/bill-of-materials")
    @Timed
    public List<BillOfMaterialsDTO> getAllBillOfMaterials() {
        log.debug("REST request to get all BillOfMaterials");
        return billOfMaterialsService.findAll();
        }

    /**
     * GET  /bill-of-materials/:id : get the "id" billOfMaterials.
     *
     * @param id the id of the billOfMaterialsDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the billOfMaterialsDTO, or with status 404 (Not Found)
     */
    @GetMapping("/bill-of-materials/{id}")
    @Timed
    public ResponseEntity<BillOfMaterialsDTO> getBillOfMaterials(@PathVariable Long id) {
        log.debug("REST request to get BillOfMaterials : {}", id);
        BillOfMaterialsDTO billOfMaterialsDTO = billOfMaterialsService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(billOfMaterialsDTO));
    }

    /**
     * DELETE  /bill-of-materials/:id : delete the "id" billOfMaterials.
     *
     * @param id the id of the billOfMaterialsDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/bill-of-materials/{id}")
    @Timed
    public ResponseEntity<Void> deleteBillOfMaterials(@PathVariable Long id) {
        log.debug("REST request to delete BillOfMaterials : {}", id);
        billOfMaterialsService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
