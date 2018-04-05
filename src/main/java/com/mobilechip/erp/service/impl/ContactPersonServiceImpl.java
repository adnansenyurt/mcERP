package com.mobilechip.erp.service.impl;

import com.mobilechip.erp.service.ContactPersonService;
import com.mobilechip.erp.domain.ContactPerson;
import com.mobilechip.erp.repository.ContactPersonRepository;
import com.mobilechip.erp.service.dto.ContactPersonDTO;
import com.mobilechip.erp.service.mapper.ContactPersonMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing ContactPerson.
 */
@Service
@Transactional
public class ContactPersonServiceImpl implements ContactPersonService {

    private final Logger log = LoggerFactory.getLogger(ContactPersonServiceImpl.class);

    private final ContactPersonRepository contactPersonRepository;

    private final ContactPersonMapper contactPersonMapper;

    public ContactPersonServiceImpl(ContactPersonRepository contactPersonRepository, ContactPersonMapper contactPersonMapper) {
        this.contactPersonRepository = contactPersonRepository;
        this.contactPersonMapper = contactPersonMapper;
    }

    /**
     * Save a contactPerson.
     *
     * @param contactPersonDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public ContactPersonDTO save(ContactPersonDTO contactPersonDTO) {
        log.debug("Request to save ContactPerson : {}", contactPersonDTO);
        ContactPerson contactPerson = contactPersonMapper.toEntity(contactPersonDTO);
        contactPerson = contactPersonRepository.save(contactPerson);
        return contactPersonMapper.toDto(contactPerson);
    }

    /**
     * Get all the contactPeople.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<ContactPersonDTO> findAll() {
        log.debug("Request to get all ContactPeople");
        return contactPersonRepository.findAll().stream()
            .map(contactPersonMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one contactPerson by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public ContactPersonDTO findOne(Long id) {
        log.debug("Request to get ContactPerson : {}", id);
        ContactPerson contactPerson = contactPersonRepository.findOne(id);
        return contactPersonMapper.toDto(contactPerson);
    }

    /**
     * Delete the contactPerson by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete ContactPerson : {}", id);
        contactPersonRepository.delete(id);
    }
}
