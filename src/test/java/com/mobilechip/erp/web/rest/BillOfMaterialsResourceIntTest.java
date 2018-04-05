package com.mobilechip.erp.web.rest;

import com.mobilechip.erp.McErpApp;

import com.mobilechip.erp.domain.BillOfMaterials;
import com.mobilechip.erp.repository.BillOfMaterialsRepository;
import com.mobilechip.erp.service.BillOfMaterialsService;
import com.mobilechip.erp.service.dto.BillOfMaterialsDTO;
import com.mobilechip.erp.service.mapper.BillOfMaterialsMapper;
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
 * Test class for the BillOfMaterialsResource REST controller.
 *
 * @see BillOfMaterialsResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = McErpApp.class)
public class BillOfMaterialsResourceIntTest {

    private static final Integer DEFAULT_ITEMS = 1;
    private static final Integer UPDATED_ITEMS = 2;

    @Autowired
    private BillOfMaterialsRepository billOfMaterialsRepository;

    @Autowired
    private BillOfMaterialsMapper billOfMaterialsMapper;

    @Autowired
    private BillOfMaterialsService billOfMaterialsService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restBillOfMaterialsMockMvc;

    private BillOfMaterials billOfMaterials;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final BillOfMaterialsResource billOfMaterialsResource = new BillOfMaterialsResource(billOfMaterialsService);
        this.restBillOfMaterialsMockMvc = MockMvcBuilders.standaloneSetup(billOfMaterialsResource)
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
    public static BillOfMaterials createEntity(EntityManager em) {
        BillOfMaterials billOfMaterials = new BillOfMaterials()
            .items(DEFAULT_ITEMS);
        return billOfMaterials;
    }

    @Before
    public void initTest() {
        billOfMaterials = createEntity(em);
    }

    @Test
    @Transactional
    public void createBillOfMaterials() throws Exception {
        int databaseSizeBeforeCreate = billOfMaterialsRepository.findAll().size();

        // Create the BillOfMaterials
        BillOfMaterialsDTO billOfMaterialsDTO = billOfMaterialsMapper.toDto(billOfMaterials);
        restBillOfMaterialsMockMvc.perform(post("/api/bill-of-materials")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(billOfMaterialsDTO)))
            .andExpect(status().isCreated());

        // Validate the BillOfMaterials in the database
        List<BillOfMaterials> billOfMaterialsList = billOfMaterialsRepository.findAll();
        assertThat(billOfMaterialsList).hasSize(databaseSizeBeforeCreate + 1);
        BillOfMaterials testBillOfMaterials = billOfMaterialsList.get(billOfMaterialsList.size() - 1);
        assertThat(testBillOfMaterials.getItems()).isEqualTo(DEFAULT_ITEMS);
    }

    @Test
    @Transactional
    public void createBillOfMaterialsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = billOfMaterialsRepository.findAll().size();

        // Create the BillOfMaterials with an existing ID
        billOfMaterials.setId(1L);
        BillOfMaterialsDTO billOfMaterialsDTO = billOfMaterialsMapper.toDto(billOfMaterials);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBillOfMaterialsMockMvc.perform(post("/api/bill-of-materials")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(billOfMaterialsDTO)))
            .andExpect(status().isBadRequest());

        // Validate the BillOfMaterials in the database
        List<BillOfMaterials> billOfMaterialsList = billOfMaterialsRepository.findAll();
        assertThat(billOfMaterialsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllBillOfMaterials() throws Exception {
        // Initialize the database
        billOfMaterialsRepository.saveAndFlush(billOfMaterials);

        // Get all the billOfMaterialsList
        restBillOfMaterialsMockMvc.perform(get("/api/bill-of-materials?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(billOfMaterials.getId().intValue())))
            .andExpect(jsonPath("$.[*].items").value(hasItem(DEFAULT_ITEMS)));
    }

    @Test
    @Transactional
    public void getBillOfMaterials() throws Exception {
        // Initialize the database
        billOfMaterialsRepository.saveAndFlush(billOfMaterials);

        // Get the billOfMaterials
        restBillOfMaterialsMockMvc.perform(get("/api/bill-of-materials/{id}", billOfMaterials.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(billOfMaterials.getId().intValue()))
            .andExpect(jsonPath("$.items").value(DEFAULT_ITEMS));
    }

    @Test
    @Transactional
    public void getNonExistingBillOfMaterials() throws Exception {
        // Get the billOfMaterials
        restBillOfMaterialsMockMvc.perform(get("/api/bill-of-materials/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBillOfMaterials() throws Exception {
        // Initialize the database
        billOfMaterialsRepository.saveAndFlush(billOfMaterials);
        int databaseSizeBeforeUpdate = billOfMaterialsRepository.findAll().size();

        // Update the billOfMaterials
        BillOfMaterials updatedBillOfMaterials = billOfMaterialsRepository.findOne(billOfMaterials.getId());
        // Disconnect from session so that the updates on updatedBillOfMaterials are not directly saved in db
        em.detach(updatedBillOfMaterials);
        updatedBillOfMaterials
            .items(UPDATED_ITEMS);
        BillOfMaterialsDTO billOfMaterialsDTO = billOfMaterialsMapper.toDto(updatedBillOfMaterials);

        restBillOfMaterialsMockMvc.perform(put("/api/bill-of-materials")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(billOfMaterialsDTO)))
            .andExpect(status().isOk());

        // Validate the BillOfMaterials in the database
        List<BillOfMaterials> billOfMaterialsList = billOfMaterialsRepository.findAll();
        assertThat(billOfMaterialsList).hasSize(databaseSizeBeforeUpdate);
        BillOfMaterials testBillOfMaterials = billOfMaterialsList.get(billOfMaterialsList.size() - 1);
        assertThat(testBillOfMaterials.getItems()).isEqualTo(UPDATED_ITEMS);
    }

    @Test
    @Transactional
    public void updateNonExistingBillOfMaterials() throws Exception {
        int databaseSizeBeforeUpdate = billOfMaterialsRepository.findAll().size();

        // Create the BillOfMaterials
        BillOfMaterialsDTO billOfMaterialsDTO = billOfMaterialsMapper.toDto(billOfMaterials);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restBillOfMaterialsMockMvc.perform(put("/api/bill-of-materials")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(billOfMaterialsDTO)))
            .andExpect(status().isCreated());

        // Validate the BillOfMaterials in the database
        List<BillOfMaterials> billOfMaterialsList = billOfMaterialsRepository.findAll();
        assertThat(billOfMaterialsList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteBillOfMaterials() throws Exception {
        // Initialize the database
        billOfMaterialsRepository.saveAndFlush(billOfMaterials);
        int databaseSizeBeforeDelete = billOfMaterialsRepository.findAll().size();

        // Get the billOfMaterials
        restBillOfMaterialsMockMvc.perform(delete("/api/bill-of-materials/{id}", billOfMaterials.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<BillOfMaterials> billOfMaterialsList = billOfMaterialsRepository.findAll();
        assertThat(billOfMaterialsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(BillOfMaterials.class);
        BillOfMaterials billOfMaterials1 = new BillOfMaterials();
        billOfMaterials1.setId(1L);
        BillOfMaterials billOfMaterials2 = new BillOfMaterials();
        billOfMaterials2.setId(billOfMaterials1.getId());
        assertThat(billOfMaterials1).isEqualTo(billOfMaterials2);
        billOfMaterials2.setId(2L);
        assertThat(billOfMaterials1).isNotEqualTo(billOfMaterials2);
        billOfMaterials1.setId(null);
        assertThat(billOfMaterials1).isNotEqualTo(billOfMaterials2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(BillOfMaterialsDTO.class);
        BillOfMaterialsDTO billOfMaterialsDTO1 = new BillOfMaterialsDTO();
        billOfMaterialsDTO1.setId(1L);
        BillOfMaterialsDTO billOfMaterialsDTO2 = new BillOfMaterialsDTO();
        assertThat(billOfMaterialsDTO1).isNotEqualTo(billOfMaterialsDTO2);
        billOfMaterialsDTO2.setId(billOfMaterialsDTO1.getId());
        assertThat(billOfMaterialsDTO1).isEqualTo(billOfMaterialsDTO2);
        billOfMaterialsDTO2.setId(2L);
        assertThat(billOfMaterialsDTO1).isNotEqualTo(billOfMaterialsDTO2);
        billOfMaterialsDTO1.setId(null);
        assertThat(billOfMaterialsDTO1).isNotEqualTo(billOfMaterialsDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(billOfMaterialsMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(billOfMaterialsMapper.fromId(null)).isNull();
    }
}
