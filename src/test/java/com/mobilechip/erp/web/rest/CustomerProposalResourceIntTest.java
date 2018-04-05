package com.mobilechip.erp.web.rest;

import com.mobilechip.erp.McErpApp;

import com.mobilechip.erp.domain.CustomerProposal;
import com.mobilechip.erp.repository.CustomerProposalRepository;
import com.mobilechip.erp.service.CustomerProposalService;
import com.mobilechip.erp.service.dto.CustomerProposalDTO;
import com.mobilechip.erp.service.mapper.CustomerProposalMapper;
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
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static com.mobilechip.erp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the CustomerProposalResource REST controller.
 *
 * @see CustomerProposalResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = McErpApp.class)
public class CustomerProposalResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Instant DEFAULT_DATE_SUBMITTED = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE_SUBMITTED = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Integer DEFAULT_DURATION = 1;
    private static final Integer UPDATED_DURATION = 2;

    private static final Long DEFAULT_AMOUNT = 1L;
    private static final Long UPDATED_AMOUNT = 2L;

    @Autowired
    private CustomerProposalRepository customerProposalRepository;

    @Autowired
    private CustomerProposalMapper customerProposalMapper;

    @Autowired
    private CustomerProposalService customerProposalService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCustomerProposalMockMvc;

    private CustomerProposal customerProposal;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CustomerProposalResource customerProposalResource = new CustomerProposalResource(customerProposalService);
        this.restCustomerProposalMockMvc = MockMvcBuilders.standaloneSetup(customerProposalResource)
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
    public static CustomerProposal createEntity(EntityManager em) {
        CustomerProposal customerProposal = new CustomerProposal()
            .name(DEFAULT_NAME)
            .dateSubmitted(DEFAULT_DATE_SUBMITTED)
            .duration(DEFAULT_DURATION)
            .amount(DEFAULT_AMOUNT);
        return customerProposal;
    }

    @Before
    public void initTest() {
        customerProposal = createEntity(em);
    }

    @Test
    @Transactional
    public void createCustomerProposal() throws Exception {
        int databaseSizeBeforeCreate = customerProposalRepository.findAll().size();

        // Create the CustomerProposal
        CustomerProposalDTO customerProposalDTO = customerProposalMapper.toDto(customerProposal);
        restCustomerProposalMockMvc.perform(post("/api/customer-proposals")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(customerProposalDTO)))
            .andExpect(status().isCreated());

        // Validate the CustomerProposal in the database
        List<CustomerProposal> customerProposalList = customerProposalRepository.findAll();
        assertThat(customerProposalList).hasSize(databaseSizeBeforeCreate + 1);
        CustomerProposal testCustomerProposal = customerProposalList.get(customerProposalList.size() - 1);
        assertThat(testCustomerProposal.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testCustomerProposal.getDateSubmitted()).isEqualTo(DEFAULT_DATE_SUBMITTED);
        assertThat(testCustomerProposal.getDuration()).isEqualTo(DEFAULT_DURATION);
        assertThat(testCustomerProposal.getAmount()).isEqualTo(DEFAULT_AMOUNT);
    }

    @Test
    @Transactional
    public void createCustomerProposalWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = customerProposalRepository.findAll().size();

        // Create the CustomerProposal with an existing ID
        customerProposal.setId(1L);
        CustomerProposalDTO customerProposalDTO = customerProposalMapper.toDto(customerProposal);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCustomerProposalMockMvc.perform(post("/api/customer-proposals")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(customerProposalDTO)))
            .andExpect(status().isBadRequest());

        // Validate the CustomerProposal in the database
        List<CustomerProposal> customerProposalList = customerProposalRepository.findAll();
        assertThat(customerProposalList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = customerProposalRepository.findAll().size();
        // set the field null
        customerProposal.setName(null);

        // Create the CustomerProposal, which fails.
        CustomerProposalDTO customerProposalDTO = customerProposalMapper.toDto(customerProposal);

        restCustomerProposalMockMvc.perform(post("/api/customer-proposals")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(customerProposalDTO)))
            .andExpect(status().isBadRequest());

        List<CustomerProposal> customerProposalList = customerProposalRepository.findAll();
        assertThat(customerProposalList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDateSubmittedIsRequired() throws Exception {
        int databaseSizeBeforeTest = customerProposalRepository.findAll().size();
        // set the field null
        customerProposal.setDateSubmitted(null);

        // Create the CustomerProposal, which fails.
        CustomerProposalDTO customerProposalDTO = customerProposalMapper.toDto(customerProposal);

        restCustomerProposalMockMvc.perform(post("/api/customer-proposals")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(customerProposalDTO)))
            .andExpect(status().isBadRequest());

        List<CustomerProposal> customerProposalList = customerProposalRepository.findAll();
        assertThat(customerProposalList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCustomerProposals() throws Exception {
        // Initialize the database
        customerProposalRepository.saveAndFlush(customerProposal);

        // Get all the customerProposalList
        restCustomerProposalMockMvc.perform(get("/api/customer-proposals?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(customerProposal.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].dateSubmitted").value(hasItem(DEFAULT_DATE_SUBMITTED.toString())))
            .andExpect(jsonPath("$.[*].duration").value(hasItem(DEFAULT_DURATION)))
            .andExpect(jsonPath("$.[*].amount").value(hasItem(DEFAULT_AMOUNT.intValue())));
    }

    @Test
    @Transactional
    public void getCustomerProposal() throws Exception {
        // Initialize the database
        customerProposalRepository.saveAndFlush(customerProposal);

        // Get the customerProposal
        restCustomerProposalMockMvc.perform(get("/api/customer-proposals/{id}", customerProposal.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(customerProposal.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.dateSubmitted").value(DEFAULT_DATE_SUBMITTED.toString()))
            .andExpect(jsonPath("$.duration").value(DEFAULT_DURATION))
            .andExpect(jsonPath("$.amount").value(DEFAULT_AMOUNT.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingCustomerProposal() throws Exception {
        // Get the customerProposal
        restCustomerProposalMockMvc.perform(get("/api/customer-proposals/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCustomerProposal() throws Exception {
        // Initialize the database
        customerProposalRepository.saveAndFlush(customerProposal);
        int databaseSizeBeforeUpdate = customerProposalRepository.findAll().size();

        // Update the customerProposal
        CustomerProposal updatedCustomerProposal = customerProposalRepository.findOne(customerProposal.getId());
        // Disconnect from session so that the updates on updatedCustomerProposal are not directly saved in db
        em.detach(updatedCustomerProposal);
        updatedCustomerProposal
            .name(UPDATED_NAME)
            .dateSubmitted(UPDATED_DATE_SUBMITTED)
            .duration(UPDATED_DURATION)
            .amount(UPDATED_AMOUNT);
        CustomerProposalDTO customerProposalDTO = customerProposalMapper.toDto(updatedCustomerProposal);

        restCustomerProposalMockMvc.perform(put("/api/customer-proposals")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(customerProposalDTO)))
            .andExpect(status().isOk());

        // Validate the CustomerProposal in the database
        List<CustomerProposal> customerProposalList = customerProposalRepository.findAll();
        assertThat(customerProposalList).hasSize(databaseSizeBeforeUpdate);
        CustomerProposal testCustomerProposal = customerProposalList.get(customerProposalList.size() - 1);
        assertThat(testCustomerProposal.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testCustomerProposal.getDateSubmitted()).isEqualTo(UPDATED_DATE_SUBMITTED);
        assertThat(testCustomerProposal.getDuration()).isEqualTo(UPDATED_DURATION);
        assertThat(testCustomerProposal.getAmount()).isEqualTo(UPDATED_AMOUNT);
    }

    @Test
    @Transactional
    public void updateNonExistingCustomerProposal() throws Exception {
        int databaseSizeBeforeUpdate = customerProposalRepository.findAll().size();

        // Create the CustomerProposal
        CustomerProposalDTO customerProposalDTO = customerProposalMapper.toDto(customerProposal);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCustomerProposalMockMvc.perform(put("/api/customer-proposals")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(customerProposalDTO)))
            .andExpect(status().isCreated());

        // Validate the CustomerProposal in the database
        List<CustomerProposal> customerProposalList = customerProposalRepository.findAll();
        assertThat(customerProposalList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteCustomerProposal() throws Exception {
        // Initialize the database
        customerProposalRepository.saveAndFlush(customerProposal);
        int databaseSizeBeforeDelete = customerProposalRepository.findAll().size();

        // Get the customerProposal
        restCustomerProposalMockMvc.perform(delete("/api/customer-proposals/{id}", customerProposal.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<CustomerProposal> customerProposalList = customerProposalRepository.findAll();
        assertThat(customerProposalList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CustomerProposal.class);
        CustomerProposal customerProposal1 = new CustomerProposal();
        customerProposal1.setId(1L);
        CustomerProposal customerProposal2 = new CustomerProposal();
        customerProposal2.setId(customerProposal1.getId());
        assertThat(customerProposal1).isEqualTo(customerProposal2);
        customerProposal2.setId(2L);
        assertThat(customerProposal1).isNotEqualTo(customerProposal2);
        customerProposal1.setId(null);
        assertThat(customerProposal1).isNotEqualTo(customerProposal2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(CustomerProposalDTO.class);
        CustomerProposalDTO customerProposalDTO1 = new CustomerProposalDTO();
        customerProposalDTO1.setId(1L);
        CustomerProposalDTO customerProposalDTO2 = new CustomerProposalDTO();
        assertThat(customerProposalDTO1).isNotEqualTo(customerProposalDTO2);
        customerProposalDTO2.setId(customerProposalDTO1.getId());
        assertThat(customerProposalDTO1).isEqualTo(customerProposalDTO2);
        customerProposalDTO2.setId(2L);
        assertThat(customerProposalDTO1).isNotEqualTo(customerProposalDTO2);
        customerProposalDTO1.setId(null);
        assertThat(customerProposalDTO1).isNotEqualTo(customerProposalDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(customerProposalMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(customerProposalMapper.fromId(null)).isNull();
    }
}
