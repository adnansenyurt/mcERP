package com.mobilechip.erp.service;

import com.mobilechip.erp.service.dto.ContactPersonDTO;
import java.util.List;

/**
 * Service Interface for managing ContactPerson.
 */
public interface ContactPersonService {

    /**
     * Save a contactPerson.
     *
     * @param contactPersonDTO the entity to save
     * @return the persisted entity
     */
    ContactPersonDTO save(ContactPersonDTO contactPersonDTO);

    /**
     * Get all the contactPeople.
     *
     * @return the list of entities
     */
    List<ContactPersonDTO> findAll();

    /**
     * Get the "id" contactPerson.
     *
     * @param id the id of the entity
     * @return the entity
     */
    ContactPersonDTO findOne(Long id);

    /**
     * Delete the "id" contactPerson.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
