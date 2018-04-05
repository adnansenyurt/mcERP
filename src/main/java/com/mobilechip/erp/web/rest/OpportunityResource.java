package com.mobilechip.erp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mobilechip.erp.service.OpportunityService;
import com.mobilechip.erp.web.rest.errors.BadRequestAlertException;
import com.mobilechip.erp.web.rest.util.HeaderUtil;
import com.mobilechip.erp.service.dto.OpportunityDTO;
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
 * REST controller for managing Opportunity.
 */
@RestController
@RequestMapping("/api")
public class OpportunityResource {

    private final Logger log = LoggerFactory.getLogger(OpportunityResource.class);

    private static final String ENTITY_NAME = "opportunity";

    private final OpportunityService opportunityService;

    public OpportunityResource(OpportunityService opportunityService) {
        this.opportunityService = opportunityService;
    }

    /**
     * POST  /opportunities : Create a new opportunity.
     *
     * @param opportunityDTO the opportunityDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new opportunityDTO, or with status 400 (Bad Request) if the opportunity has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/opportunities")
    @Timed
    public ResponseEntity<OpportunityDTO> createOpportunity(@Valid @RequestBody OpportunityDTO opportunityDTO) throws URISyntaxException {
        log.debug("REST request to save Opportunity : {}", opportunityDTO);
        if (opportunityDTO.getId() != null) {
            throw new BadRequestAlertException("A new opportunity cannot already have an ID", ENTITY_NAME, "idexists");
        }
        OpportunityDTO result = opportunityService.save(opportunityDTO);
        return ResponseEntity.created(new URI("/api/opportunities/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /opportunities : Updates an existing opportunity.
     *
     * @param opportunityDTO the opportunityDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated opportunityDTO,
     * or with status 400 (Bad Request) if the opportunityDTO is not valid,
     * or with status 500 (Internal Server Error) if the opportunityDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/opportunities")
    @Timed
    public ResponseEntity<OpportunityDTO> updateOpportunity(@Valid @RequestBody OpportunityDTO opportunityDTO) throws URISyntaxException {
        log.debug("REST request to update Opportunity : {}", opportunityDTO);
        if (opportunityDTO.getId() == null) {
            return createOpportunity(opportunityDTO);
        }
        OpportunityDTO result = opportunityService.save(opportunityDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, opportunityDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /opportunities : get all the opportunities.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of opportunities in body
     */
    @GetMapping("/opportunities")
    @Timed
    public List<OpportunityDTO> getAllOpportunities() {
        log.debug("REST request to get all Opportunities");
        return opportunityService.findAll();
        }

    /**
     * GET  /opportunities/:id : get the "id" opportunity.
     *
     * @param id the id of the opportunityDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the opportunityDTO, or with status 404 (Not Found)
     */
    @GetMapping("/opportunities/{id}")
    @Timed
    public ResponseEntity<OpportunityDTO> getOpportunity(@PathVariable Long id) {
        log.debug("REST request to get Opportunity : {}", id);
        OpportunityDTO opportunityDTO = opportunityService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(opportunityDTO));
    }

    /**
     * DELETE  /opportunities/:id : delete the "id" opportunity.
     *
     * @param id the id of the opportunityDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/opportunities/{id}")
    @Timed
    public ResponseEntity<Void> deleteOpportunity(@PathVariable Long id) {
        log.debug("REST request to delete Opportunity : {}", id);
        opportunityService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
