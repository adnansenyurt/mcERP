package com.mobilechip.erp.web.rest;

import com.mobilechip.erp.McErpApp;

import com.mobilechip.erp.domain.SupplyPartContract;
import com.mobilechip.erp.repository.SupplyPartContractRepository;
import com.mobilechip.erp.service.SupplyPartContractService;
import com.mobilechip.erp.service.dto.SupplyPartContractDTO;
import com.mobilechip.erp.service.mapper.SupplyPartContractMapper;
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
 * Test class for the SupplyPartContractResource REST controller.
 *
 * @see SupplyPartContractResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = McErpApp.class)
public class SupplyPartContractResourceIntTest {

    @Autowired
    private SupplyPartContractRepository supplyPartContractRepository;

    @Autowired
    private SupplyPartContractMapper supplyPartContractMapper;

    @Autowired
    private SupplyPartContractService supplyPartContractService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restSupplyPartContractMockMvc;

    private SupplyPartContract supplyPartContract;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SupplyPartContractResource supplyPartContractResource = new SupplyPartContractResource(supplyPartContractService);
        this.restSupplyPartContractMockMvc = MockMvcBuilders.standaloneSetup(supplyPartContractResource)
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
    public static SupplyPartContract createEntity(EntityManager em) {
        SupplyPartContract supplyPartContract = new SupplyPartContract();
        return supplyPartContract;
    }

    @Before
    public void initTest() {
        supplyPartContract = createEntity(em);
    }

    @Test
    @Transactional
    public void createSupplyPartContract() throws Exception {
        int databaseSizeBeforeCreate = supplyPartContractRepository.findAll().size();

        // Create the SupplyPartContract
        SupplyPartContractDTO supplyPartContractDTO = supplyPartContractMapper.toDto(supplyPartContract);
        restSupplyPartContractMockMvc.perform(post("/api/supply-part-contracts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(supplyPartContractDTO)))
            .andExpect(status().isCreated());

        // Validate the SupplyPartContract in the database
        List<SupplyPartContract> supplyPartContractList = supplyPartContractRepository.findAll();
        assertThat(supplyPartContractList).hasSize(databaseSizeBeforeCreate + 1);
        SupplyPartContract testSupplyPartContract = supplyPartContractList.get(supplyPartContractList.size() - 1);
    }

    @Test
    @Transactional
    public void createSupplyPartContractWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = supplyPartContractRepository.findAll().size();

        // Create the SupplyPartContract with an existing ID
        supplyPartContract.setId(1L);
        SupplyPartContractDTO supplyPartContractDTO = supplyPartContractMapper.toDto(supplyPartContract);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSupplyPartContractMockMvc.perform(post("/api/supply-part-contracts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(supplyPartContractDTO)))
            .andExpect(status().isBadRequest());

        // Validate the SupplyPartContract in the database
        List<SupplyPartContract> supplyPartContractList = supplyPartContractRepository.findAll();
        assertThat(supplyPartContractList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllSupplyPartContracts() throws Exception {
        // Initialize the database
        supplyPartContractRepository.saveAndFlush(supplyPartContract);

        // Get all the supplyPartContractList
        restSupplyPartContractMockMvc.perform(get("/api/supply-part-contracts?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(supplyPartContract.getId().intValue())));
    }

    @Test
    @Transactional
    public void getSupplyPartContract() throws Exception {
        // Initialize the database
        supplyPartContractRepository.saveAndFlush(supplyPartContract);

        // Get the supplyPartContract
        restSupplyPartContractMockMvc.perform(get("/api/supply-part-contracts/{id}", supplyPartContract.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(supplyPartContract.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingSupplyPartContract() throws Exception {
        // Get the supplyPartContract
        restSupplyPartContractMockMvc.perform(get("/api/supply-part-contracts/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSupplyPartContract() throws Exception {
        // Initialize the database
        supplyPartContractRepository.saveAndFlush(supplyPartContract);
        int databaseSizeBeforeUpdate = supplyPartContractRepository.findAll().size();

        // Update the supplyPartContract
        SupplyPartContract updatedSupplyPartContract = supplyPartContractRepository.findOne(supplyPartContract.getId());
        // Disconnect from session so that the updates on updatedSupplyPartContract are not directly saved in db
        em.detach(updatedSupplyPartContract);
        SupplyPartContractDTO supplyPartContractDTO = supplyPartContractMapper.toDto(updatedSupplyPartContract);

        restSupplyPartContractMockMvc.perform(put("/api/supply-part-contracts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(supplyPartContractDTO)))
            .andExpect(status().isOk());

        // Validate the SupplyPartContract in the database
        List<SupplyPartContract> supplyPartContractList = supplyPartContractRepository.findAll();
        assertThat(supplyPartContractList).hasSize(databaseSizeBeforeUpdate);
        SupplyPartContract testSupplyPartContract = supplyPartContractList.get(supplyPartContractList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingSupplyPartContract() throws Exception {
        int databaseSizeBeforeUpdate = supplyPartContractRepository.findAll().size();

        // Create the SupplyPartContract
        SupplyPartContractDTO supplyPartContractDTO = supplyPartContractMapper.toDto(supplyPartContract);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restSupplyPartContractMockMvc.perform(put("/api/supply-part-contracts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(supplyPartContractDTO)))
            .andExpect(status().isCreated());

        // Validate the SupplyPartContract in the database
        List<SupplyPartContract> supplyPartContractList = supplyPartContractRepository.findAll();
        assertThat(supplyPartContractList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteSupplyPartContract() throws Exception {
        // Initialize the database
        supplyPartContractRepository.saveAndFlush(supplyPartContract);
        int databaseSizeBeforeDelete = supplyPartContractRepository.findAll().size();

        // Get the supplyPartContract
        restSupplyPartContractMockMvc.perform(delete("/api/supply-part-contracts/{id}", supplyPartContract.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<SupplyPartContract> supplyPartContractList = supplyPartContractRepository.findAll();
        assertThat(supplyPartContractList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SupplyPartContract.class);
        SupplyPartContract supplyPartContract1 = new SupplyPartContract();
        supplyPartContract1.setId(1L);
        SupplyPartContract supplyPartContract2 = new SupplyPartContract();
        supplyPartContract2.setId(supplyPartContract1.getId());
        assertThat(supplyPartContract1).isEqualTo(supplyPartContract2);
        supplyPartContract2.setId(2L);
        assertThat(supplyPartContract1).isNotEqualTo(supplyPartContract2);
        supplyPartContract1.setId(null);
        assertThat(supplyPartContract1).isNotEqualTo(supplyPartContract2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(SupplyPartContractDTO.class);
        SupplyPartContractDTO supplyPartContractDTO1 = new SupplyPartContractDTO();
        supplyPartContractDTO1.setId(1L);
        SupplyPartContractDTO supplyPartContractDTO2 = new SupplyPartContractDTO();
        assertThat(supplyPartContractDTO1).isNotEqualTo(supplyPartContractDTO2);
        supplyPartContractDTO2.setId(supplyPartContractDTO1.getId());
        assertThat(supplyPartContractDTO1).isEqualTo(supplyPartContractDTO2);
        supplyPartContractDTO2.setId(2L);
        assertThat(supplyPartContractDTO1).isNotEqualTo(supplyPartContractDTO2);
        supplyPartContractDTO1.setId(null);
        assertThat(supplyPartContractDTO1).isNotEqualTo(supplyPartContractDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(supplyPartContractMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(supplyPartContractMapper.fromId(null)).isNull();
    }
}
