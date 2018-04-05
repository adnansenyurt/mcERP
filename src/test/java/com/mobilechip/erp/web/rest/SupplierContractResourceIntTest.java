package com.mobilechip.erp.web.rest;

import com.mobilechip.erp.McErpApp;

import com.mobilechip.erp.domain.SupplierContract;
import com.mobilechip.erp.repository.SupplierContractRepository;
import com.mobilechip.erp.service.SupplierContractService;
import com.mobilechip.erp.service.dto.SupplierContractDTO;
import com.mobilechip.erp.service.mapper.SupplierContractMapper;
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
 * Test class for the SupplierContractResource REST controller.
 *
 * @see SupplierContractResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = McErpApp.class)
public class SupplierContractResourceIntTest {

    private static final Instant DEFAULT_DATE_SIGNED = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE_SIGNED = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private SupplierContractRepository supplierContractRepository;

    @Autowired
    private SupplierContractMapper supplierContractMapper;

    @Autowired
    private SupplierContractService supplierContractService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restSupplierContractMockMvc;

    private SupplierContract supplierContract;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SupplierContractResource supplierContractResource = new SupplierContractResource(supplierContractService);
        this.restSupplierContractMockMvc = MockMvcBuilders.standaloneSetup(supplierContractResource)
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
    public static SupplierContract createEntity(EntityManager em) {
        SupplierContract supplierContract = new SupplierContract()
            .dateSigned(DEFAULT_DATE_SIGNED);
        return supplierContract;
    }

    @Before
    public void initTest() {
        supplierContract = createEntity(em);
    }

    @Test
    @Transactional
    public void createSupplierContract() throws Exception {
        int databaseSizeBeforeCreate = supplierContractRepository.findAll().size();

        // Create the SupplierContract
        SupplierContractDTO supplierContractDTO = supplierContractMapper.toDto(supplierContract);
        restSupplierContractMockMvc.perform(post("/api/supplier-contracts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(supplierContractDTO)))
            .andExpect(status().isCreated());

        // Validate the SupplierContract in the database
        List<SupplierContract> supplierContractList = supplierContractRepository.findAll();
        assertThat(supplierContractList).hasSize(databaseSizeBeforeCreate + 1);
        SupplierContract testSupplierContract = supplierContractList.get(supplierContractList.size() - 1);
        assertThat(testSupplierContract.getDateSigned()).isEqualTo(DEFAULT_DATE_SIGNED);
    }

    @Test
    @Transactional
    public void createSupplierContractWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = supplierContractRepository.findAll().size();

        // Create the SupplierContract with an existing ID
        supplierContract.setId(1L);
        SupplierContractDTO supplierContractDTO = supplierContractMapper.toDto(supplierContract);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSupplierContractMockMvc.perform(post("/api/supplier-contracts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(supplierContractDTO)))
            .andExpect(status().isBadRequest());

        // Validate the SupplierContract in the database
        List<SupplierContract> supplierContractList = supplierContractRepository.findAll();
        assertThat(supplierContractList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkDateSignedIsRequired() throws Exception {
        int databaseSizeBeforeTest = supplierContractRepository.findAll().size();
        // set the field null
        supplierContract.setDateSigned(null);

        // Create the SupplierContract, which fails.
        SupplierContractDTO supplierContractDTO = supplierContractMapper.toDto(supplierContract);

        restSupplierContractMockMvc.perform(post("/api/supplier-contracts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(supplierContractDTO)))
            .andExpect(status().isBadRequest());

        List<SupplierContract> supplierContractList = supplierContractRepository.findAll();
        assertThat(supplierContractList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllSupplierContracts() throws Exception {
        // Initialize the database
        supplierContractRepository.saveAndFlush(supplierContract);

        // Get all the supplierContractList
        restSupplierContractMockMvc.perform(get("/api/supplier-contracts?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(supplierContract.getId().intValue())))
            .andExpect(jsonPath("$.[*].dateSigned").value(hasItem(DEFAULT_DATE_SIGNED.toString())));
    }

    @Test
    @Transactional
    public void getSupplierContract() throws Exception {
        // Initialize the database
        supplierContractRepository.saveAndFlush(supplierContract);

        // Get the supplierContract
        restSupplierContractMockMvc.perform(get("/api/supplier-contracts/{id}", supplierContract.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(supplierContract.getId().intValue()))
            .andExpect(jsonPath("$.dateSigned").value(DEFAULT_DATE_SIGNED.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingSupplierContract() throws Exception {
        // Get the supplierContract
        restSupplierContractMockMvc.perform(get("/api/supplier-contracts/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSupplierContract() throws Exception {
        // Initialize the database
        supplierContractRepository.saveAndFlush(supplierContract);
        int databaseSizeBeforeUpdate = supplierContractRepository.findAll().size();

        // Update the supplierContract
        SupplierContract updatedSupplierContract = supplierContractRepository.findOne(supplierContract.getId());
        // Disconnect from session so that the updates on updatedSupplierContract are not directly saved in db
        em.detach(updatedSupplierContract);
        updatedSupplierContract
            .dateSigned(UPDATED_DATE_SIGNED);
        SupplierContractDTO supplierContractDTO = supplierContractMapper.toDto(updatedSupplierContract);

        restSupplierContractMockMvc.perform(put("/api/supplier-contracts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(supplierContractDTO)))
            .andExpect(status().isOk());

        // Validate the SupplierContract in the database
        List<SupplierContract> supplierContractList = supplierContractRepository.findAll();
        assertThat(supplierContractList).hasSize(databaseSizeBeforeUpdate);
        SupplierContract testSupplierContract = supplierContractList.get(supplierContractList.size() - 1);
        assertThat(testSupplierContract.getDateSigned()).isEqualTo(UPDATED_DATE_SIGNED);
    }

    @Test
    @Transactional
    public void updateNonExistingSupplierContract() throws Exception {
        int databaseSizeBeforeUpdate = supplierContractRepository.findAll().size();

        // Create the SupplierContract
        SupplierContractDTO supplierContractDTO = supplierContractMapper.toDto(supplierContract);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restSupplierContractMockMvc.perform(put("/api/supplier-contracts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(supplierContractDTO)))
            .andExpect(status().isCreated());

        // Validate the SupplierContract in the database
        List<SupplierContract> supplierContractList = supplierContractRepository.findAll();
        assertThat(supplierContractList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteSupplierContract() throws Exception {
        // Initialize the database
        supplierContractRepository.saveAndFlush(supplierContract);
        int databaseSizeBeforeDelete = supplierContractRepository.findAll().size();

        // Get the supplierContract
        restSupplierContractMockMvc.perform(delete("/api/supplier-contracts/{id}", supplierContract.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<SupplierContract> supplierContractList = supplierContractRepository.findAll();
        assertThat(supplierContractList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SupplierContract.class);
        SupplierContract supplierContract1 = new SupplierContract();
        supplierContract1.setId(1L);
        SupplierContract supplierContract2 = new SupplierContract();
        supplierContract2.setId(supplierContract1.getId());
        assertThat(supplierContract1).isEqualTo(supplierContract2);
        supplierContract2.setId(2L);
        assertThat(supplierContract1).isNotEqualTo(supplierContract2);
        supplierContract1.setId(null);
        assertThat(supplierContract1).isNotEqualTo(supplierContract2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(SupplierContractDTO.class);
        SupplierContractDTO supplierContractDTO1 = new SupplierContractDTO();
        supplierContractDTO1.setId(1L);
        SupplierContractDTO supplierContractDTO2 = new SupplierContractDTO();
        assertThat(supplierContractDTO1).isNotEqualTo(supplierContractDTO2);
        supplierContractDTO2.setId(supplierContractDTO1.getId());
        assertThat(supplierContractDTO1).isEqualTo(supplierContractDTO2);
        supplierContractDTO2.setId(2L);
        assertThat(supplierContractDTO1).isNotEqualTo(supplierContractDTO2);
        supplierContractDTO1.setId(null);
        assertThat(supplierContractDTO1).isNotEqualTo(supplierContractDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(supplierContractMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(supplierContractMapper.fromId(null)).isNull();
    }
}
