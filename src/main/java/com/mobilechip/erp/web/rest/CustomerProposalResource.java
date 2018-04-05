package com.mobilechip.erp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mobilechip.erp.service.CustomerProposalService;
import com.mobilechip.erp.web.rest.errors.BadRequestAlertException;
import com.mobilechip.erp.web.rest.util.HeaderUtil;
import com.mobilechip.erp.service.dto.CustomerProposalDTO;
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
 * REST controller for managing CustomerProposal.
 */
@RestController
@RequestMapping("/api")
public class CustomerProposalResource {

    private final Logger log = LoggerFactory.getLogger(CustomerProposalResource.class);

    private static final String ENTITY_NAME = "customerProposal";

    private final CustomerProposalService customerProposalService;

    public CustomerProposalResource(CustomerProposalService customerProposalService) {
        this.customerProposalService = customerProposalService;
    }

    /**
     * POST  /customer-proposals : Create a new customerProposal.
     *
     * @param customerProposalDTO the customerProposalDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new customerProposalDTO, or with status 400 (Bad Request) if the customerProposal has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/customer-proposals")
    @Timed
    public ResponseEntity<CustomerProposalDTO> createCustomerProposal(@Valid @RequestBody CustomerProposalDTO customerProposalDTO) throws URISyntaxException {
        log.debug("REST request to save CustomerProposal : {}", customerProposalDTO);
        if (customerProposalDTO.getId() != null) {
            throw new BadRequestAlertException("A new customerProposal cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CustomerProposalDTO result = customerProposalService.save(customerProposalDTO);
        return ResponseEntity.created(new URI("/api/customer-proposals/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /customer-proposals : Updates an existing customerProposal.
     *
     * @param customerProposalDTO the customerProposalDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated customerProposalDTO,
     * or with status 400 (Bad Request) if the customerProposalDTO is not valid,
     * or with status 500 (Internal Server Error) if the customerProposalDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/customer-proposals")
    @Timed
    public ResponseEntity<CustomerProposalDTO> updateCustomerProposal(@Valid @RequestBody CustomerProposalDTO customerProposalDTO) throws URISyntaxException {
        log.debug("REST request to update CustomerProposal : {}", customerProposalDTO);
        if (customerProposalDTO.getId() == null) {
            return createCustomerProposal(customerProposalDTO);
        }
        CustomerProposalDTO result = customerProposalService.save(customerProposalDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, customerProposalDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /customer-proposals : get all the customerProposals.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of customerProposals in body
     */
    @GetMapping("/customer-proposals")
    @Timed
    public List<CustomerProposalDTO> getAllCustomerProposals() {
        log.debug("REST request to get all CustomerProposals");
        return customerProposalService.findAll();
        }

    /**
     * GET  /customer-proposals/:id : get the "id" customerProposal.
     *
     * @param id the id of the customerProposalDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the customerProposalDTO, or with status 404 (Not Found)
     */
    @GetMapping("/customer-proposals/{id}")
    @Timed
    public ResponseEntity<CustomerProposalDTO> getCustomerProposal(@PathVariable Long id) {
        log.debug("REST request to get CustomerProposal : {}", id);
        CustomerProposalDTO customerProposalDTO = customerProposalService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(customerProposalDTO));
    }

    /**
     * DELETE  /customer-proposals/:id : delete the "id" customerProposal.
     *
     * @param id the id of the customerProposalDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/customer-proposals/{id}")
    @Timed
    public ResponseEntity<Void> deleteCustomerProposal(@PathVariable Long id) {
        log.debug("REST request to delete CustomerProposal : {}", id);
        customerProposalService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
