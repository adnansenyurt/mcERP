package com.mobilechip.erp.web.rest;

import com.mobilechip.erp.McErpApp;

import com.mobilechip.erp.domain.SupplyStock;
import com.mobilechip.erp.repository.SupplyStockRepository;
import com.mobilechip.erp.service.SupplyStockService;
import com.mobilechip.erp.service.dto.SupplyStockDTO;
import com.mobilechip.erp.service.mapper.SupplyStockMapper;
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
 * Test class for the SupplyStockResource REST controller.
 *
 * @see SupplyStockResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = McErpApp.class)
public class SupplyStockResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Long DEFAULT_AMOUNT = 1L;
    private static final Long UPDATED_AMOUNT = 2L;

    @Autowired
    private SupplyStockRepository supplyStockRepository;

    @Autowired
    private SupplyStockMapper supplyStockMapper;

    @Autowired
    private SupplyStockService supplyStockService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restSupplyStockMockMvc;

    private SupplyStock supplyStock;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SupplyStockResource supplyStockResource = new SupplyStockResource(supplyStockService);
        this.restSupplyStockMockMvc = MockMvcBuilders.standaloneSetup(supplyStockResource)
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
    public static SupplyStock createEntity(EntityManager em) {
        SupplyStock supplyStock = new SupplyStock()
            .name(DEFAULT_NAME)
            .amount(DEFAULT_AMOUNT);
        return supplyStock;
    }

    @Before
    public void initTest() {
        supplyStock = createEntity(em);
    }

    @Test
    @Transactional
    public void createSupplyStock() throws Exception {
        int databaseSizeBeforeCreate = supplyStockRepository.findAll().size();

        // Create the SupplyStock
        SupplyStockDTO supplyStockDTO = supplyStockMapper.toDto(supplyStock);
        restSupplyStockMockMvc.perform(post("/api/supply-stocks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(supplyStockDTO)))
            .andExpect(status().isCreated());

        // Validate the SupplyStock in the database
        List<SupplyStock> supplyStockList = supplyStockRepository.findAll();
        assertThat(supplyStockList).hasSize(databaseSizeBeforeCreate + 1);
        SupplyStock testSupplyStock = supplyStockList.get(supplyStockList.size() - 1);
        assertThat(testSupplyStock.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testSupplyStock.getAmount()).isEqualTo(DEFAULT_AMOUNT);
    }

    @Test
    @Transactional
    public void createSupplyStockWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = supplyStockRepository.findAll().size();

        // Create the SupplyStock with an existing ID
        supplyStock.setId(1L);
        SupplyStockDTO supplyStockDTO = supplyStockMapper.toDto(supplyStock);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSupplyStockMockMvc.perform(post("/api/supply-stocks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(supplyStockDTO)))
            .andExpect(status().isBadRequest());

        // Validate the SupplyStock in the database
        List<SupplyStock> supplyStockList = supplyStockRepository.findAll();
        assertThat(supplyStockList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = supplyStockRepository.findAll().size();
        // set the field null
        supplyStock.setName(null);

        // Create the SupplyStock, which fails.
        SupplyStockDTO supplyStockDTO = supplyStockMapper.toDto(supplyStock);

        restSupplyStockMockMvc.perform(post("/api/supply-stocks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(supplyStockDTO)))
            .andExpect(status().isBadRequest());

        List<SupplyStock> supplyStockList = supplyStockRepository.findAll();
        assertThat(supplyStockList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllSupplyStocks() throws Exception {
        // Initialize the database
        supplyStockRepository.saveAndFlush(supplyStock);

        // Get all the supplyStockList
        restSupplyStockMockMvc.perform(get("/api/supply-stocks?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(supplyStock.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].amount").value(hasItem(DEFAULT_AMOUNT.intValue())));
    }

    @Test
    @Transactional
    public void getSupplyStock() throws Exception {
        // Initialize the database
        supplyStockRepository.saveAndFlush(supplyStock);

        // Get the supplyStock
        restSupplyStockMockMvc.perform(get("/api/supply-stocks/{id}", supplyStock.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(supplyStock.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.amount").value(DEFAULT_AMOUNT.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingSupplyStock() throws Exception {
        // Get the supplyStock
        restSupplyStockMockMvc.perform(get("/api/supply-stocks/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSupplyStock() throws Exception {
        // Initialize the database
        supplyStockRepository.saveAndFlush(supplyStock);
        int databaseSizeBeforeUpdate = supplyStockRepository.findAll().size();

        // Update the supplyStock
        SupplyStock updatedSupplyStock = supplyStockRepository.findOne(supplyStock.getId());
        // Disconnect from session so that the updates on updatedSupplyStock are not directly saved in db
        em.detach(updatedSupplyStock);
        updatedSupplyStock
            .name(UPDATED_NAME)
            .amount(UPDATED_AMOUNT);
        SupplyStockDTO supplyStockDTO = supplyStockMapper.toDto(updatedSupplyStock);

        restSupplyStockMockMvc.perform(put("/api/supply-stocks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(supplyStockDTO)))
            .andExpect(status().isOk());

        // Validate the SupplyStock in the database
        List<SupplyStock> supplyStockList = supplyStockRepository.findAll();
        assertThat(supplyStockList).hasSize(databaseSizeBeforeUpdate);
        SupplyStock testSupplyStock = supplyStockList.get(supplyStockList.size() - 1);
        assertThat(testSupplyStock.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testSupplyStock.getAmount()).isEqualTo(UPDATED_AMOUNT);
    }

    @Test
    @Transactional
    public void updateNonExistingSupplyStock() throws Exception {
        int databaseSizeBeforeUpdate = supplyStockRepository.findAll().size();

        // Create the SupplyStock
        SupplyStockDTO supplyStockDTO = supplyStockMapper.toDto(supplyStock);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restSupplyStockMockMvc.perform(put("/api/supply-stocks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(supplyStockDTO)))
            .andExpect(status().isCreated());

        // Validate the SupplyStock in the database
        List<SupplyStock> supplyStockList = supplyStockRepository.findAll();
        assertThat(supplyStockList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteSupplyStock() throws Exception {
        // Initialize the database
        supplyStockRepository.saveAndFlush(supplyStock);
        int databaseSizeBeforeDelete = supplyStockRepository.findAll().size();

        // Get the supplyStock
        restSupplyStockMockMvc.perform(delete("/api/supply-stocks/{id}", supplyStock.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<SupplyStock> supplyStockList = supplyStockRepository.findAll();
        assertThat(supplyStockList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SupplyStock.class);
        SupplyStock supplyStock1 = new SupplyStock();
        supplyStock1.setId(1L);
        SupplyStock supplyStock2 = new SupplyStock();
        supplyStock2.setId(supplyStock1.getId());
        assertThat(supplyStock1).isEqualTo(supplyStock2);
        supplyStock2.setId(2L);
        assertThat(supplyStock1).isNotEqualTo(supplyStock2);
        supplyStock1.setId(null);
        assertThat(supplyStock1).isNotEqualTo(supplyStock2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(SupplyStockDTO.class);
        SupplyStockDTO supplyStockDTO1 = new SupplyStockDTO();
        supplyStockDTO1.setId(1L);
        SupplyStockDTO supplyStockDTO2 = new SupplyStockDTO();
        assertThat(supplyStockDTO1).isNotEqualTo(supplyStockDTO2);
        supplyStockDTO2.setId(supplyStockDTO1.getId());
        assertThat(supplyStockDTO1).isEqualTo(supplyStockDTO2);
        supplyStockDTO2.setId(2L);
        assertThat(supplyStockDTO1).isNotEqualTo(supplyStockDTO2);
        supplyStockDTO1.setId(null);
        assertThat(supplyStockDTO1).isNotEqualTo(supplyStockDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(supplyStockMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(supplyStockMapper.fromId(null)).isNull();
    }
}
