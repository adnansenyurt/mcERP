package com.mobilechip.erp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mobilechip.erp.service.ContactPersonService;
import com.mobilechip.erp.web.rest.errors.BadRequestAlertException;
import com.mobilechip.erp.web.rest.util.HeaderUtil;
import com.mobilechip.erp.service.dto.ContactPersonDTO;
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
 * REST controller for managing ContactPerson.
 */
@RestController
@RequestMapping("/api")
public class ContactPersonResource {

    private final Logger log = LoggerFactory.getLogger(ContactPersonResource.class);

    private static final String ENTITY_NAME = "contactPerson";

    private final ContactPersonService contactPersonService;

    public ContactPersonResource(ContactPersonService contactPersonService) {
        this.contactPersonService = contactPersonService;
    }

    /**
     * POST  /contact-people : Create a new contactPerson.
     *
     * @param contactPersonDTO the contactPersonDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new contactPersonDTO, or with status 400 (Bad Request) if the contactPerson has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/contact-people")
    @Timed
    public ResponseEntity<ContactPersonDTO> createContactPerson(@Valid @RequestBody ContactPersonDTO contactPersonDTO) throws URISyntaxException {
        log.debug("REST request to save ContactPerson : {}", contactPersonDTO);
        if (contactPersonDTO.getId() != null) {
            throw new BadRequestAlertException("A new contactPerson cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ContactPersonDTO result = contactPersonService.save(contactPersonDTO);
        return ResponseEntity.created(new URI("/api/contact-people/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /contact-people : Updates an existing contactPerson.
     *
     * @param contactPersonDTO the contactPersonDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated contactPersonDTO,
     * or with status 400 (Bad Request) if the contactPersonDTO is not valid,
     * or with status 500 (Internal Server Error) if the contactPersonDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/contact-people")
    @Timed
    public ResponseEntity<ContactPersonDTO> updateContactPerson(@Valid @RequestBody ContactPersonDTO contactPersonDTO) throws URISyntaxException {
        log.debug("REST request to update ContactPerson : {}", contactPersonDTO);
        if (contactPersonDTO.getId() == null) {
            return createContactPerson(contactPersonDTO);
        }
        ContactPersonDTO result = contactPersonService.save(contactPersonDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, contactPersonDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /contact-people : get all the contactPeople.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of contactPeople in body
     */
    @GetMapping("/contact-people")
    @Timed
    public List<ContactPersonDTO> getAllContactPeople() {
        log.debug("REST request to get all ContactPeople");
        return contactPersonService.findAll();
        }

    /**
     * GET  /contact-people/:id : get the "id" contactPerson.
     *
     * @param id the id of the contactPersonDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the contactPersonDTO, or with status 404 (Not Found)
     */
    @GetMapping("/contact-people/{id}")
    @Timed
    public ResponseEntity<ContactPersonDTO> getContactPerson(@PathVariable Long id) {
        log.debug("REST request to get ContactPerson : {}", id);
        ContactPersonDTO contactPersonDTO = contactPersonService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(contactPersonDTO));
    }

    /**
     * DELETE  /contact-people/:id : delete the "id" contactPerson.
     *
     * @param id the id of the contactPersonDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/contact-people/{id}")
    @Timed
    public ResponseEntity<Void> deleteContactPerson(@PathVariable Long id) {
        log.debug("REST request to delete ContactPerson : {}", id);
        contactPersonService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
