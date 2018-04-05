package com.mobilechip.erp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mobilechip.erp.service.CashFlowService;
import com.mobilechip.erp.web.rest.errors.BadRequestAlertException;
import com.mobilechip.erp.web.rest.util.HeaderUtil;
import com.mobilechip.erp.service.dto.CashFlowDTO;
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
 * REST controller for managing CashFlow.
 */
@RestController
@RequestMapping("/api")
public class CashFlowResource {

    private final Logger log = LoggerFactory.getLogger(CashFlowResource.class);

    private static final String ENTITY_NAME = "cashFlow";

    private final CashFlowService cashFlowService;

    public CashFlowResource(CashFlowService cashFlowService) {
        this.cashFlowService = cashFlowService;
    }

    /**
     * POST  /cash-flows : Create a new cashFlow.
     *
     * @param cashFlowDTO the cashFlowDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new cashFlowDTO, or with status 400 (Bad Request) if the cashFlow has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/cash-flows")
    @Timed
    public ResponseEntity<CashFlowDTO> createCashFlow(@Valid @RequestBody CashFlowDTO cashFlowDTO) throws URISyntaxException {
        log.debug("REST request to save CashFlow : {}", cashFlowDTO);
        if (cashFlowDTO.getId() != null) {
            throw new BadRequestAlertException("A new cashFlow cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CashFlowDTO result = cashFlowService.save(cashFlowDTO);
        return ResponseEntity.created(new URI("/api/cash-flows/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /cash-flows : Updates an existing cashFlow.
     *
     * @param cashFlowDTO the cashFlowDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated cashFlowDTO,
     * or with status 400 (Bad Request) if the cashFlowDTO is not valid,
     * or with status 500 (Internal Server Error) if the cashFlowDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/cash-flows")
    @Timed
    public ResponseEntity<CashFlowDTO> updateCashFlow(@Valid @RequestBody CashFlowDTO cashFlowDTO) throws URISyntaxException {
        log.debug("REST request to update CashFlow : {}", cashFlowDTO);
        if (cashFlowDTO.getId() == null) {
            return createCashFlow(cashFlowDTO);
        }
        CashFlowDTO result = cashFlowService.save(cashFlowDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, cashFlowDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /cash-flows : get all the cashFlows.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of cashFlows in body
     */
    @GetMapping("/cash-flows")
    @Timed
    public List<CashFlowDTO> getAllCashFlows() {
        log.debug("REST request to get all CashFlows");
        return cashFlowService.findAll();
        }

    /**
     * GET  /cash-flows/:id : get the "id" cashFlow.
     *
     * @param id the id of the cashFlowDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the cashFlowDTO, or with status 404 (Not Found)
     */
    @GetMapping("/cash-flows/{id}")
    @Timed
    public ResponseEntity<CashFlowDTO> getCashFlow(@PathVariable Long id) {
        log.debug("REST request to get CashFlow : {}", id);
        CashFlowDTO cashFlowDTO = cashFlowService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(cashFlowDTO));
    }

    /**
     * DELETE  /cash-flows/:id : delete the "id" cashFlow.
     *
     * @param id the id of the cashFlowDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/cash-flows/{id}")
    @Timed
    public ResponseEntity<Void> deleteCashFlow(@PathVariable Long id) {
        log.debug("REST request to delete CashFlow : {}", id);
        cashFlowService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
