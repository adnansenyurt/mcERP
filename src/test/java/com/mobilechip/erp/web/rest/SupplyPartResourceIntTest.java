package com.mobilechip.erp.web.rest;

import com.mobilechip.erp.McErpApp;

import com.mobilechip.erp.domain.SupplyPart;
import com.mobilechip.erp.repository.SupplyPartRepository;
import com.mobilechip.erp.service.SupplyPartService;
import com.mobilechip.erp.service.dto.SupplyPartDTO;
import com.mobilechip.erp.service.mapper.SupplyPartMapper;
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
 * Test class for the SupplyPartResource REST controller.
 *
 * @see SupplyPartResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = McErpApp.class)
public class SupplyPartResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_SUPPLIER_PART_CODE = "AAAAAAAAAA";
    private static final String UPDATED_SUPPLIER_PART_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private SupplyPartRepository supplyPartRepository;

    @Autowired
    private SupplyPartMapper supplyPartMapper;

    @Autowired
    private SupplyPartService supplyPartService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restSupplyPartMockMvc;

    private SupplyPart supplyPart;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SupplyPartResource supplyPartResource = new SupplyPartResource(supplyPartService);
        this.restSupplyPartMockMvc = MockMvcBuilders.standaloneSetup(supplyPartResource)
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
    public static SupplyPart createEntity(EntityManager em) {
        SupplyPart supplyPart = new SupplyPart()
            .name(DEFAULT_NAME)
            .supplierPartCode(DEFAULT_SUPPLIER_PART_CODE)
            .description(DEFAULT_DESCRIPTION);
        return supplyPart;
    }

    @Before
    public void initTest() {
        supplyPart = createEntity(em);
    }

    @Test
    @Transactional
    public void createSupplyPart() throws Exception {
        int databaseSizeBeforeCreate = supplyPartRepository.findAll().size();

        // Create the SupplyPart
        SupplyPartDTO supplyPartDTO = supplyPartMapper.toDto(supplyPart);
        restSupplyPartMockMvc.perform(post("/api/supply-parts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(supplyPartDTO)))
            .andExpect(status().isCreated());

        // Validate the SupplyPart in the database
        List<SupplyPart> supplyPartList = supplyPartRepository.findAll();
        assertThat(supplyPartList).hasSize(databaseSizeBeforeCreate + 1);
        SupplyPart testSupplyPart = supplyPartList.get(supplyPartList.size() - 1);
        assertThat(testSupplyPart.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testSupplyPart.getSupplierPartCode()).isEqualTo(DEFAULT_SUPPLIER_PART_CODE);
        assertThat(testSupplyPart.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createSupplyPartWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = supplyPartRepository.findAll().size();

        // Create the SupplyPart with an existing ID
        supplyPart.setId(1L);
        SupplyPartDTO supplyPartDTO = supplyPartMapper.toDto(supplyPart);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSupplyPartMockMvc.perform(post("/api/supply-parts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(supplyPartDTO)))
            .andExpect(status().isBadRequest());

        // Validate the SupplyPart in the database
        List<SupplyPart> supplyPartList = supplyPartRepository.findAll();
        assertThat(supplyPartList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = supplyPartRepository.findAll().size();
        // set the field null
        supplyPart.setName(null);

        // Create the SupplyPart, which fails.
        SupplyPartDTO supplyPartDTO = supplyPartMapper.toDto(supplyPart);

        restSupplyPartMockMvc.perform(post("/api/supply-parts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(supplyPartDTO)))
            .andExpect(status().isBadRequest());

        List<SupplyPart> supplyPartList = supplyPartRepository.findAll();
        assertThat(supplyPartList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllSupplyParts() throws Exception {
        // Initialize the database
        supplyPartRepository.saveAndFlush(supplyPart);

        // Get all the supplyPartList
        restSupplyPartMockMvc.perform(get("/api/supply-parts?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(supplyPart.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].supplierPartCode").value(hasItem(DEFAULT_SUPPLIER_PART_CODE.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())));
    }

    @Test
    @Transactional
    public void getSupplyPart() throws Exception {
        // Initialize the database
        supplyPartRepository.saveAndFlush(supplyPart);

        // Get the supplyPart
        restSupplyPartMockMvc.perform(get("/api/supply-parts/{id}", supplyPart.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(supplyPart.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.supplierPartCode").value(DEFAULT_SUPPLIER_PART_CODE.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingSupplyPart() throws Exception {
        // Get the supplyPart
        restSupplyPartMockMvc.perform(get("/api/supply-parts/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSupplyPart() throws Exception {
        // Initialize the database
        supplyPartRepository.saveAndFlush(supplyPart);
        int databaseSizeBeforeUpdate = supplyPartRepository.findAll().size();

        // Update the supplyPart
        SupplyPart updatedSupplyPart = supplyPartRepository.findOne(supplyPart.getId());
        // Disconnect from session so that the updates on updatedSupplyPart are not directly saved in db
        em.detach(updatedSupplyPart);
        updatedSupplyPart
            .name(UPDATED_NAME)
            .supplierPartCode(UPDATED_SUPPLIER_PART_CODE)
            .description(UPDATED_DESCRIPTION);
        SupplyPartDTO supplyPartDTO = supplyPartMapper.toDto(updatedSupplyPart);

        restSupplyPartMockMvc.perform(put("/api/supply-parts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(supplyPartDTO)))
            .andExpect(status().isOk());

        // Validate the SupplyPart in the database
        List<SupplyPart> supplyPartList = supplyPartRepository.findAll();
        assertThat(supplyPartList).hasSize(databaseSizeBeforeUpdate);
        SupplyPart testSupplyPart = supplyPartList.get(supplyPartList.size() - 1);
        assertThat(testSupplyPart.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testSupplyPart.getSupplierPartCode()).isEqualTo(UPDATED_SUPPLIER_PART_CODE);
        assertThat(testSupplyPart.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingSupplyPart() throws Exception {
        int databaseSizeBeforeUpdate = supplyPartRepository.findAll().size();

        // Create the SupplyPart
        SupplyPartDTO supplyPartDTO = supplyPartMapper.toDto(supplyPart);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restSupplyPartMockMvc.perform(put("/api/supply-parts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(supplyPartDTO)))
            .andExpect(status().isCreated());

        // Validate the SupplyPart in the database
        List<SupplyPart> supplyPartList = supplyPartRepository.findAll();
        assertThat(supplyPartList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteSupplyPart() throws Exception {
        // Initialize the database
        supplyPartRepository.saveAndFlush(supplyPart);
        int databaseSizeBeforeDelete = supplyPartRepository.findAll().size();

        // Get the supplyPart
        restSupplyPartMockMvc.perform(delete("/api/supply-parts/{id}", supplyPart.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<SupplyPart> supplyPartList = supplyPartRepository.findAll();
        assertThat(supplyPartList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SupplyPart.class);
        SupplyPart supplyPart1 = new SupplyPart();
        supplyPart1.setId(1L);
        SupplyPart supplyPart2 = new SupplyPart();
        supplyPart2.setId(supplyPart1.getId());
        assertThat(supplyPart1).isEqualTo(supplyPart2);
        supplyPart2.setId(2L);
        assertThat(supplyPart1).isNotEqualTo(supplyPart2);
        supplyPart1.setId(null);
        assertThat(supplyPart1).isNotEqualTo(supplyPart2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(SupplyPartDTO.class);
        SupplyPartDTO supplyPartDTO1 = new SupplyPartDTO();
        supplyPartDTO1.setId(1L);
        SupplyPartDTO supplyPartDTO2 = new SupplyPartDTO();
        assertThat(supplyPartDTO1).isNotEqualTo(supplyPartDTO2);
        supplyPartDTO2.setId(supplyPartDTO1.getId());
        assertThat(supplyPartDTO1).isEqualTo(supplyPartDTO2);
        supplyPartDTO2.setId(2L);
        assertThat(supplyPartDTO1).isNotEqualTo(supplyPartDTO2);
        supplyPartDTO1.setId(null);
        assertThat(supplyPartDTO1).isNotEqualTo(supplyPartDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(supplyPartMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(supplyPartMapper.fromId(null)).isNull();
    }
}
