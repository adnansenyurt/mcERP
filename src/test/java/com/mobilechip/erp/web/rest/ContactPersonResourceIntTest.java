package com.mobilechip.erp.web.rest;

import com.mobilechip.erp.McErpApp;

import com.mobilechip.erp.domain.ContactPerson;
import com.mobilechip.erp.repository.ContactPersonRepository;
import com.mobilechip.erp.service.ContactPersonService;
import com.mobilechip.erp.service.dto.ContactPersonDTO;
import com.mobilechip.erp.service.mapper.ContactPersonMapper;
import com.mobilechip.erp.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static com.mobilechip.erp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ContactPersonResource REST controller.
 *
 * @see ContactPersonResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = McErpApp.class)
public class ContactPersonResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_ROLE = "AAAAAAAAAA";
    private static final String UPDATED_ROLE = "BBBBBBBBBB";

    private static final String DEFAULT_E_MAIL = "AAAAAAAAAA";
    private static final String UPDATED_E_MAIL = "BBBBBBBBBB";

    private static final String DEFAULT_MOBILE = "AAAAAAAAAA";
    private static final String UPDATED_MOBILE = "BBBBBBBBBB";

    @Autowired
    private ContactPersonRepository contactPersonRepository;

    @Autowired
    private ContactPersonMapper contactPersonMapper;

    @Autowired
    private ContactPersonService contactPersonService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restContactPersonMockMvc;

    private ContactPerson contactPerson;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ContactPersonResource contactPersonResource = new ContactPersonResource(contactPersonService);
        this.restContactPersonMockMvc = MockMvcBuilders.standaloneSetup(contactPersonResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ContactPerson createEntity(EntityManager em) {
        ContactPerson contactPerson = new ContactPerson()
            .name(DEFAULT_NAME)
            .role(DEFAULT_ROLE)
            .eMail(DEFAULT_E_MAIL)
            .mobile(DEFAULT_MOBILE);
        return contactPerson;
    }

    @Before
    public void initTest() {
        contactPerson = createEntity(em);
    }

    @Test
    @Transactional
    public void createContactPerson() throws Exception {
        int databaseSizeBeforeCreate = contactPersonRepository.findAll().size();

        // Create the ContactPerson
        ContactPersonDTO contactPersonDTO = contactPersonMapper.toDto(contactPerson);
        restContactPersonMockMvc.perform(post("/api/contact-people")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(contactPersonDTO)))
            .andExpect(status().isCreated());

        // Validate the ContactPerson in the database
        List<ContactPerson> contactPersonList = contactPersonRepository.findAll();
        assertThat(contactPersonList).hasSize(databaseSizeBeforeCreate + 1);
        ContactPerson testContactPerson = contactPersonList.get(contactPersonList.size() - 1);
        assertThat(testContactPerson.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testContactPerson.getRole()).isEqualTo(DEFAULT_ROLE);
        assertThat(testContactPerson.geteMail()).isEqualTo(DEFAULT_E_MAIL);
        assertThat(testContactPerson.getMobile()).isEqualTo(DEFAULT_MOBILE);
    }

    @Test
    @Transactional
    public void createContactPersonWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = contactPersonRepository.findAll().size();

        // Create the ContactPerson with an existing ID
        contactPerson.setId(1L);
        ContactPersonDTO contactPersonDTO = contactPersonMapper.toDto(contactPerson);

        // An entity with an existing ID cannot be created, so this API call must fail
        restContactPersonMockMvc.perform(post("/api/contact-people")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(contactPersonDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ContactPerson in the database
        List<ContactPerson> contactPersonList = contactPersonRepository.findAll();
        assertThat(contactPersonList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = contactPersonRepository.findAll().size();
        // set the field null
        contactPerson.setName(null);

        // Create the ContactPerson, which fails.
        ContactPersonDTO contactPersonDTO = contactPersonMapper.toDto(contactPerson);

        restContactPersonMockMvc.perform(post("/api/contact-people")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(contactPersonDTO)))
            .andExpect(status().isBadRequest());

        List<ContactPerson> contactPersonList = contactPersonRepository.findAll();
        assertThat(contactPersonList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllContactPeople() throws Exception {
        // Initialize the database
        contactPersonRepository.saveAndFlush(contactPerson);

        // Get all the contactPersonList
        restContactPersonMockMvc.perform(get("/api/contact-people?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(contactPerson.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].role").value(hasItem(DEFAULT_ROLE.toString())))
            .andExpect(jsonPath("$.[*].eMail").value(hasItem(DEFAULT_E_MAIL.toString())))
            .andExpect(jsonPath("$.[*].mobile").value(hasItem(DEFAULT_MOBILE.toString())));
    }

    @Test
    @Transactional
    public void getContactPerson() throws Exception {
        // Initialize the database
        contactPersonRepository.saveAndFlush(contactPerson);

        // Get the contactPerson
        restContactPersonMockMvc.perform(get("/api/contact-people/{id}", contactPerson.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(contactPerson.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.role").value(DEFAULT_ROLE.toString()))
            .andExpect(jsonPath("$.eMail").value(DEFAULT_E_MAIL.toString()))
            .andExpect(jsonPath("$.mobile").value(DEFAULT_MOBILE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingContactPerson() throws Exception {
        // Get the contactPerson
        restContactPersonMockMvc.perform(get("/api/contact-people/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateContactPerson() throws Exception {
        // Initialize the database
        contactPersonRepository.saveAndFlush(contactPerson);
        int databaseSizeBeforeUpdate = contactPersonRepository.findAll().size();

        // Update the contactPerson
        ContactPerson updatedContactPerson = contactPersonRepository.findOne(contactPerson.getId());
        // Disconnect from session so that the updates on updatedContactPerson are not directly saved in db
        em.detach(updatedContactPerson);
        updatedContactPerson
            .name(UPDATED_NAME)
            .role(UPDATED_ROLE)
            .eMail(UPDATED_E_MAIL)
            .mobile(UPDATED_MOBILE);
        ContactPersonDTO contactPersonDTO = contactPersonMapper.toDto(updatedContactPerson);

        restContactPersonMockMvc.perform(put("/api/contact-people")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(contactPersonDTO)))
            .andExpect(status().isOk());

        // Validate the ContactPerson in the database
        List<ContactPerson> contactPersonList = contactPersonRepository.findAll();
        assertThat(contactPersonList).hasSize(databaseSizeBeforeUpdate);
        ContactPerson testContactPerson = contactPersonList.get(contactPersonList.size() - 1);
        assertThat(testContactPerson.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testContactPerson.getRole()).isEqualTo(UPDATED_ROLE);
        assertThat(testContactPerson.geteMail()).isEqualTo(UPDATED_E_MAIL);
        assertThat(testContactPerson.getMobile()).isEqualTo(UPDATED_MOBILE);
    }

    @Test
    @Transactional
    public void updateNonExistingContactPerson() throws Exception {
        int databaseSizeBeforeUpdate = contactPersonRepository.findAll().size();

        // Create the ContactPerson
        ContactPersonDTO contactPersonDTO = contactPersonMapper.toDto(contactPerson);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restContactPersonMockMvc.perform(put("/api/contact-people")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(contactPersonDTO)))
            .andExpect(status().isCreated());

        // Validate the ContactPerson in the database
        List<ContactPerson> contactPersonList = contactPersonRepository.findAll();
        assertThat(contactPersonList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteContactPerson() throws Exception {
        // Initialize the database
        contactPersonRepository.saveAndFlush(contactPerson);
        int databaseSizeBeforeDelete = contactPersonRepository.findAll().size();

        // Get the contactPerson
        restContactPersonMockMvc.perform(delete("/api/contact-people/{id}", contactPerson.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ContactPerson> contactPersonList = contactPersonRepository.findAll();
        assertThat(contactPersonList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ContactPerson.class);
        ContactPerson contactPerson1 = new ContactPerson();
        contactPerson1.setId(1L);
        ContactPerson contactPerson2 = new ContactPerson();
        contactPerson2.setId(contactPerson1.getId());
        assertThat(contactPerson1).isEqualTo(contactPerson2);
        contactPerson2.setId(2L);
        assertThat(contactPerson1).isNotEqualTo(contactPerson2);
        contactPerson1.setId(null);
        assertThat(contactPerson1).isNotEqualTo(contactPerson2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ContactPersonDTO.class);
        ContactPersonDTO contactPersonDTO1 = new ContactPersonDTO();
        contactPersonDTO1.setId(1L);
        ContactPersonDTO contactPersonDTO2 = new ContactPersonDTO();
        assertThat(contactPersonDTO1).isNotEqualTo(contactPersonDTO2);
        contactPersonDTO2.setId(contactPersonDTO1.getId());
        assertThat(contactPersonDTO1).isEqualTo(contactPersonDTO2);
        contactPersonDTO2.setId(2L);
        assertThat(contactPersonDTO1).isNotEqualTo(contactPersonDTO2);
        contactPersonDTO1.setId(null);
        assertThat(contactPersonDTO1).isNotEqualTo(contactPersonDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(contactPersonMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(contactPersonMapper.fromId(null)).isNull();
    }
}
