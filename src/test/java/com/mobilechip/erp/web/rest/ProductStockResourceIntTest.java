package com.mobilechip.erp.web.rest;

import com.mobilechip.erp.McErpApp;

import com.mobilechip.erp.domain.ProductStock;
import com.mobilechip.erp.repository.ProductStockRepository;
import com.mobilechip.erp.service.ProductStockService;
import com.mobilechip.erp.service.dto.ProductStockDTO;
import com.mobilechip.erp.service.mapper.ProductStockMapper;
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
 * Test class for the ProductStockResource REST controller.
 *
 * @see ProductStockResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = McErpApp.class)
public class ProductStockResourceIntTest {

    private static final String DEFAULT_SKU_CODE = "AAAAAAAAAA";
    private static final String UPDATED_SKU_CODE = "BBBBBBBBBB";

    private static final Long DEFAULT_AMOUNT = 1L;
    private static final Long UPDATED_AMOUNT = 2L;

    @Autowired
    private ProductStockRepository productStockRepository;

    @Autowired
    private ProductStockMapper productStockMapper;

    @Autowired
    private ProductStockService productStockService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restProductStockMockMvc;

    private ProductStock productStock;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ProductStockResource productStockResource = new ProductStockResource(productStockService);
        this.restProductStockMockMvc = MockMvcBuilders.standaloneSetup(productStockResource)
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
    public static ProductStock createEntity(EntityManager em) {
        ProductStock productStock = new ProductStock()
            .skuCode(DEFAULT_SKU_CODE)
            .amount(DEFAULT_AMOUNT);
        return productStock;
    }

    @Before
    public void initTest() {
        productStock = createEntity(em);
    }

    @Test
    @Transactional
    public void createProductStock() throws Exception {
        int databaseSizeBeforeCreate = productStockRepository.findAll().size();

        // Create the ProductStock
        ProductStockDTO productStockDTO = productStockMapper.toDto(productStock);
        restProductStockMockMvc.perform(post("/api/product-stocks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productStockDTO)))
            .andExpect(status().isCreated());

        // Validate the ProductStock in the database
        List<ProductStock> productStockList = productStockRepository.findAll();
        assertThat(productStockList).hasSize(databaseSizeBeforeCreate + 1);
        ProductStock testProductStock = productStockList.get(productStockList.size() - 1);
        assertThat(testProductStock.getSkuCode()).isEqualTo(DEFAULT_SKU_CODE);
        assertThat(testProductStock.getAmount()).isEqualTo(DEFAULT_AMOUNT);
    }

    @Test
    @Transactional
    public void createProductStockWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = productStockRepository.findAll().size();

        // Create the ProductStock with an existing ID
        productStock.setId(1L);
        ProductStockDTO productStockDTO = productStockMapper.toDto(productStock);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProductStockMockMvc.perform(post("/api/product-stocks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productStockDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ProductStock in the database
        List<ProductStock> productStockList = productStockRepository.findAll();
        assertThat(productStockList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkSkuCodeIsRequired() throws Exception {
        int databaseSizeBeforeTest = productStockRepository.findAll().size();
        // set the field null
        productStock.setSkuCode(null);

        // Create the ProductStock, which fails.
        ProductStockDTO productStockDTO = productStockMapper.toDto(productStock);

        restProductStockMockMvc.perform(post("/api/product-stocks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productStockDTO)))
            .andExpect(status().isBadRequest());

        List<ProductStock> productStockList = productStockRepository.findAll();
        assertThat(productStockList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllProductStocks() throws Exception {
        // Initialize the database
        productStockRepository.saveAndFlush(productStock);

        // Get all the productStockList
        restProductStockMockMvc.perform(get("/api/product-stocks?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(productStock.getId().intValue())))
            .andExpect(jsonPath("$.[*].skuCode").value(hasItem(DEFAULT_SKU_CODE.toString())))
            .andExpect(jsonPath("$.[*].amount").value(hasItem(DEFAULT_AMOUNT.intValue())));
    }

    @Test
    @Transactional
    public void getProductStock() throws Exception {
        // Initialize the database
        productStockRepository.saveAndFlush(productStock);

        // Get the productStock
        restProductStockMockMvc.perform(get("/api/product-stocks/{id}", productStock.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(productStock.getId().intValue()))
            .andExpect(jsonPath("$.skuCode").value(DEFAULT_SKU_CODE.toString()))
            .andExpect(jsonPath("$.amount").value(DEFAULT_AMOUNT.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingProductStock() throws Exception {
        // Get the productStock
        restProductStockMockMvc.perform(get("/api/product-stocks/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProductStock() throws Exception {
        // Initialize the database
        productStockRepository.saveAndFlush(productStock);
        int databaseSizeBeforeUpdate = productStockRepository.findAll().size();

        // Update the productStock
        ProductStock updatedProductStock = productStockRepository.findOne(productStock.getId());
        // Disconnect from session so that the updates on updatedProductStock are not directly saved in db
        em.detach(updatedProductStock);
        updatedProductStock
            .skuCode(UPDATED_SKU_CODE)
            .amount(UPDATED_AMOUNT);
        ProductStockDTO productStockDTO = productStockMapper.toDto(updatedProductStock);

        restProductStockMockMvc.perform(put("/api/product-stocks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productStockDTO)))
            .andExpect(status().isOk());

        // Validate the ProductStock in the database
        List<ProductStock> productStockList = productStockRepository.findAll();
        assertThat(productStockList).hasSize(databaseSizeBeforeUpdate);
        ProductStock testProductStock = productStockList.get(productStockList.size() - 1);
        assertThat(testProductStock.getSkuCode()).isEqualTo(UPDATED_SKU_CODE);
        assertThat(testProductStock.getAmount()).isEqualTo(UPDATED_AMOUNT);
    }

    @Test
    @Transactional
    public void updateNonExistingProductStock() throws Exception {
        int databaseSizeBeforeUpdate = productStockRepository.findAll().size();

        // Create the ProductStock
        ProductStockDTO productStockDTO = productStockMapper.toDto(productStock);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restProductStockMockMvc.perform(put("/api/product-stocks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productStockDTO)))
            .andExpect(status().isCreated());

        // Validate the ProductStock in the database
        List<ProductStock> productStockList = productStockRepository.findAll();
        assertThat(productStockList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteProductStock() throws Exception {
        // Initialize the database
        productStockRepository.saveAndFlush(productStock);
        int databaseSizeBeforeDelete = productStockRepository.findAll().size();

        // Get the productStock
        restProductStockMockMvc.perform(delete("/api/product-stocks/{id}", productStock.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ProductStock> productStockList = productStockRepository.findAll();
        assertThat(productStockList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProductStock.class);
        ProductStock productStock1 = new ProductStock();
        productStock1.setId(1L);
        ProductStock productStock2 = new ProductStock();
        productStock2.setId(productStock1.getId());
        assertThat(productStock1).isEqualTo(productStock2);
        productStock2.setId(2L);
        assertThat(productStock1).isNotEqualTo(productStock2);
        productStock1.setId(null);
        assertThat(productStock1).isNotEqualTo(productStock2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProductStockDTO.class);
        ProductStockDTO productStockDTO1 = new ProductStockDTO();
        productStockDTO1.setId(1L);
        ProductStockDTO productStockDTO2 = new ProductStockDTO();
        assertThat(productStockDTO1).isNotEqualTo(productStockDTO2);
        productStockDTO2.setId(productStockDTO1.getId());
        assertThat(productStockDTO1).isEqualTo(productStockDTO2);
        productStockDTO2.setId(2L);
        assertThat(productStockDTO1).isNotEqualTo(productStockDTO2);
        productStockDTO1.setId(null);
        assertThat(productStockDTO1).isNotEqualTo(productStockDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(productStockMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(productStockMapper.fromId(null)).isNull();
    }
}
