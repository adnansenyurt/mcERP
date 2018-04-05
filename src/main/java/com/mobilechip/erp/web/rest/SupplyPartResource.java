package com.mobilechip.erp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mobilechip.erp.service.SupplyPartService;
import com.mobilechip.erp.web.rest.errors.BadRequestAlertException;
import com.mobilechip.erp.web.rest.util.HeaderUtil;
import com.mobilechip.erp.service.dto.SupplyPartDTO;
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
 * REST controller for managing SupplyPart.
 */
@RestController
@RequestMapping("/api")
public class SupplyPartResource {

    private final Logger log = LoggerFactory.getLogger(SupplyPartResource.class);

    private static final String ENTITY_NAME = "supplyPart";

    private final SupplyPartService supplyPartService;

    public SupplyPartResource(SupplyPartService supplyPartService) {
        this.supplyPartService = supplyPartService;
    }

    /**
     * POST  /supply-parts : Create a new supplyPart.
     *
     * @param supplyPartDTO the supplyPartDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new supplyPartDTO, or with status 400 (Bad Request) if the supplyPart has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/supply-parts")
    @Timed
    public ResponseEntity<SupplyPartDTO> createSupplyPart(@Valid @RequestBody SupplyPartDTO supplyPartDTO) throws URISyntaxException {
        log.debug("REST request to save SupplyPart : {}", supplyPartDTO);
        if (supplyPartDTO.getId() != null) {
            throw new BadRequestAlertException("A new supplyPart cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SupplyPartDTO result = supplyPartService.save(supplyPartDTO);
        return ResponseEntity.created(new URI("/api/supply-parts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /supply-parts : Updates an existing supplyPart.
     *
     * @param supplyPartDTO the supplyPartDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated supplyPartDTO,
     * or with status 400 (Bad Request) if the supplyPartDTO is not valid,
     * or with status 500 (Internal Server Error) if the supplyPartDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/supply-parts")
    @Timed
    public ResponseEntity<SupplyPartDTO> updateSupplyPart(@Valid @RequestBody SupplyPartDTO supplyPartDTO) throws URISyntaxException {
        log.debug("REST request to update SupplyPart : {}", supplyPartDTO);
        if (supplyPartDTO.getId() == null) {
            return createSupplyPart(supplyPartDTO);
        }
        SupplyPartDTO result = supplyPartService.save(supplyPartDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, supplyPartDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /supply-parts : get all the supplyParts.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of supplyParts in body
     */
    @GetMapping("/supply-parts")
    @Timed
    public List<SupplyPartDTO> getAllSupplyParts() {
        log.debug("REST request to get all SupplyParts");
        return supplyPartService.findAll();
        }

    /**
     * GET  /supply-parts/:id : get the "id" supplyPart.
     *
     * @param id the id of the supplyPartDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the supplyPartDTO, or with status 404 (Not Found)
     */
    @GetMapping("/supply-parts/{id}")
    @Timed
    public ResponseEntity<SupplyPartDTO> getSupplyPart(@PathVariable Long id) {
        log.debug("REST request to get SupplyPart : {}", id);
        SupplyPartDTO supplyPartDTO = supplyPartService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(supplyPartDTO));
    }

    /**
     * DELETE  /supply-parts/:id : delete the "id" supplyPart.
     *
     * @param id the id of the supplyPartDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/supply-parts/{id}")
    @Timed
    public ResponseEntity<Void> deleteSupplyPart(@PathVariable Long id) {
        log.debug("REST request to delete SupplyPart : {}", id);
        supplyPartService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
