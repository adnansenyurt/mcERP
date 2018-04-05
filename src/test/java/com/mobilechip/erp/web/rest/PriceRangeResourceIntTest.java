package com.mobilechip.erp.web.rest;

import com.mobilechip.erp.McErpApp;

import com.mobilechip.erp.domain.PriceRange;
import com.mobilechip.erp.repository.PriceRangeRepository;
import com.mobilechip.erp.service.PriceRangeService;
import com.mobilechip.erp.service.dto.PriceRangeDTO;
import com.mobilechip.erp.service.mapper.PriceRangeMapper;
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

import com.mobilechip.erp.domain.enumeration.Currency;
/**
 * Test class for the PriceRangeResource REST controller.
 *
 * @see PriceRangeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = McErpApp.class)
public class PriceRangeResourceIntTest {

    private static final Integer DEFAULT_RANGE_LOW = 1;
    private static final Integer UPDATED_RANGE_LOW = 2;

    private static final Integer DEFAULT_RANGE_HIGH = 1;
    private static final Integer UPDATED_RANGE_HIGH = 2;

    private static final Long DEFAULT_PRICE = 1L;
    private static final Long UPDATED_PRICE = 2L;

    private static final Currency DEFAULT_CURRENCY = Currency.TL;
    private static final Currency UPDATED_CURRENCY = Currency.USD;

    @Autowired
    private PriceRangeRepository priceRangeRepository;

    @Autowired
    private PriceRangeMapper priceRangeMapper;

    @Autowired
    private PriceRangeService priceRangeService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restPriceRangeMockMvc;

    private PriceRange priceRange;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PriceRangeResource priceRangeResource = new PriceRangeResource(priceRangeService);
        this.restPriceRangeMockMvc = MockMvcBuilders.standaloneSetup(priceRangeResource)
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
    public static PriceRange createEntity(EntityManager em) {
        PriceRange priceRange = new PriceRange()
            .rangeLow(DEFAULT_RANGE_LOW)
            .rangeHigh(DEFAULT_RANGE_HIGH)
            .price(DEFAULT_PRICE)
            .currency(DEFAULT_CURRENCY);
        return priceRange;
    }

    @Before
    public void initTest() {
        priceRange = createEntity(em);
    }

    @Test
    @Transactional
    public void createPriceRange() throws Exception {
        int databaseSizeBeforeCreate = priceRangeRepository.findAll().size();

        // Create the PriceRange
        PriceRangeDTO priceRangeDTO = priceRangeMapper.toDto(priceRange);
        restPriceRangeMockMvc.perform(post("/api/price-ranges")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(priceRangeDTO)))
            .andExpect(status().isCreated());

        // Validate the PriceRange in the database
        List<PriceRange> priceRangeList = priceRangeRepository.findAll();
        assertThat(priceRangeList).hasSize(databaseSizeBeforeCreate + 1);
        PriceRange testPriceRange = priceRangeList.get(priceRangeList.size() - 1);
        assertThat(testPriceRange.getRangeLow()).isEqualTo(DEFAULT_RANGE_LOW);
        assertThat(testPriceRange.getRangeHigh()).isEqualTo(DEFAULT_RANGE_HIGH);
        assertThat(testPriceRange.getPrice()).isEqualTo(DEFAULT_PRICE);
        assertThat(testPriceRange.getCurrency()).isEqualTo(DEFAULT_CURRENCY);
    }

    @Test
    @Transactional
    public void createPriceRangeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = priceRangeRepository.findAll().size();

        // Create the PriceRange with an existing ID
        priceRange.setId(1L);
        PriceRangeDTO priceRangeDTO = priceRangeMapper.toDto(priceRange);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPriceRangeMockMvc.perform(post("/api/price-ranges")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(priceRangeDTO)))
            .andExpect(status().isBadRequest());

        // Validate the PriceRange in the database
        List<PriceRange> priceRangeList = priceRangeRepository.findAll();
        assertThat(priceRangeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkRangeLowIsRequired() throws Exception {
        int databaseSizeBeforeTest = priceRangeRepository.findAll().size();
        // set the field null
        priceRange.setRangeLow(null);

        // Create the PriceRange, which fails.
        PriceRangeDTO priceRangeDTO = priceRangeMapper.toDto(priceRange);

        restPriceRangeMockMvc.perform(post("/api/price-ranges")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(priceRangeDTO)))
            .andExpect(status().isBadRequest());

        List<PriceRange> priceRangeList = priceRangeRepository.findAll();
        assertThat(priceRangeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkRangeHighIsRequired() throws Exception {
        int databaseSizeBeforeTest = priceRangeRepository.findAll().size();
        // set the field null
        priceRange.setRangeHigh(null);

        // Create the PriceRange, which fails.
        PriceRangeDTO priceRangeDTO = priceRangeMapper.toDto(priceRange);

        restPriceRangeMockMvc.perform(post("/api/price-ranges")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(priceRangeDTO)))
            .andExpect(status().isBadRequest());

        List<PriceRange> priceRangeList = priceRangeRepository.findAll();
        assertThat(priceRangeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPriceIsRequired() throws Exception {
        int databaseSizeBeforeTest = priceRangeRepository.findAll().size();
        // set the field null
        priceRange.setPrice(null);

        // Create the PriceRange, which fails.
        PriceRangeDTO priceRangeDTO = priceRangeMapper.toDto(priceRange);

        restPriceRangeMockMvc.perform(post("/api/price-ranges")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(priceRangeDTO)))
            .andExpect(status().isBadRequest());

        List<PriceRange> priceRangeList = priceRangeRepository.findAll();
        assertThat(priceRangeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCurrencyIsRequired() throws Exception {
        int databaseSizeBeforeTest = priceRangeRepository.findAll().size();
        // set the field null
        priceRange.setCurrency(null);

        // Create the PriceRange, which fails.
        PriceRangeDTO priceRangeDTO = priceRangeMapper.toDto(priceRange);

        restPriceRangeMockMvc.perform(post("/api/price-ranges")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(priceRangeDTO)))
            .andExpect(status().isBadRequest());

        List<PriceRange> priceRangeList = priceRangeRepository.findAll();
        assertThat(priceRangeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllPriceRanges() throws Exception {
        // Initialize the database
        priceRangeRepository.saveAndFlush(priceRange);

        // Get all the priceRangeList
        restPriceRangeMockMvc.perform(get("/api/price-ranges?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(priceRange.getId().intValue())))
            .andExpect(jsonPath("$.[*].rangeLow").value(hasItem(DEFAULT_RANGE_LOW)))
            .andExpect(jsonPath("$.[*].rangeHigh").value(hasItem(DEFAULT_RANGE_HIGH)))
            .andExpect(jsonPath("$.[*].price").value(hasItem(DEFAULT_PRICE.intValue())))
            .andExpect(jsonPath("$.[*].currency").value(hasItem(DEFAULT_CURRENCY.toString())));
    }

    @Test
    @Transactional
    public void getPriceRange() throws Exception {
        // Initialize the database
        priceRangeRepository.saveAndFlush(priceRange);

        // Get the priceRange
        restPriceRangeMockMvc.perform(get("/api/price-ranges/{id}", priceRange.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(priceRange.getId().intValue()))
            .andExpect(jsonPath("$.rangeLow").value(DEFAULT_RANGE_LOW))
            .andExpect(jsonPath("$.rangeHigh").value(DEFAULT_RANGE_HIGH))
            .andExpect(jsonPath("$.price").value(DEFAULT_PRICE.intValue()))
            .andExpect(jsonPath("$.currency").value(DEFAULT_CURRENCY.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingPriceRange() throws Exception {
        // Get the priceRange
        restPriceRangeMockMvc.perform(get("/api/price-ranges/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePriceRange() throws Exception {
        // Initialize the database
        priceRangeRepository.saveAndFlush(priceRange);
        int databaseSizeBeforeUpdate = priceRangeRepository.findAll().size();

        // Update the priceRange
        PriceRange updatedPriceRange = priceRangeRepository.findOne(priceRange.getId());
        // Disconnect from session so that the updates on updatedPriceRange are not directly saved in db
        em.detach(updatedPriceRange);
        updatedPriceRange
            .rangeLow(UPDATED_RANGE_LOW)
            .rangeHigh(UPDATED_RANGE_HIGH)
            .price(UPDATED_PRICE)
            .currency(UPDATED_CURRENCY);
        PriceRangeDTO priceRangeDTO = priceRangeMapper.toDto(updatedPriceRange);

        restPriceRangeMockMvc.perform(put("/api/price-ranges")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(priceRangeDTO)))
            .andExpect(status().isOk());

        // Validate the PriceRange in the database
        List<PriceRange> priceRangeList = priceRangeRepository.findAll();
        assertThat(priceRangeList).hasSize(databaseSizeBeforeUpdate);
        PriceRange testPriceRange = priceRangeList.get(priceRangeList.size() - 1);
        assertThat(testPriceRange.getRangeLow()).isEqualTo(UPDATED_RANGE_LOW);
        assertThat(testPriceRange.getRangeHigh()).isEqualTo(UPDATED_RANGE_HIGH);
        assertThat(testPriceRange.getPrice()).isEqualTo(UPDATED_PRICE);
        assertThat(testPriceRange.getCurrency()).isEqualTo(UPDATED_CURRENCY);
    }

    @Test
    @Transactional
    public void updateNonExistingPriceRange() throws Exception {
        int databaseSizeBeforeUpdate = priceRangeRepository.findAll().size();

        // Create the PriceRange
        PriceRangeDTO priceRangeDTO = priceRangeMapper.toDto(priceRange);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restPriceRangeMockMvc.perform(put("/api/price-ranges")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(priceRangeDTO)))
            .andExpect(status().isCreated());

        // Validate the PriceRange in the database
        List<PriceRange> priceRangeList = priceRangeRepository.findAll();
        assertThat(priceRangeList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deletePriceRange() throws Exception {
        // Initialize the database
        priceRangeRepository.saveAndFlush(priceRange);
        int databaseSizeBeforeDelete = priceRangeRepository.findAll().size();

        // Get the priceRange
        restPriceRangeMockMvc.perform(delete("/api/price-ranges/{id}", priceRange.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<PriceRange> priceRangeList = priceRangeRepository.findAll();
        assertThat(priceRangeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PriceRange.class);
        PriceRange priceRange1 = new PriceRange();
        priceRange1.setId(1L);
        PriceRange priceRange2 = new PriceRange();
        priceRange2.setId(priceRange1.getId());
        assertThat(priceRange1).isEqualTo(priceRange2);
        priceRange2.setId(2L);
        assertThat(priceRange1).isNotEqualTo(priceRange2);
        priceRange1.setId(null);
        assertThat(priceRange1).isNotEqualTo(priceRange2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(PriceRangeDTO.class);
        PriceRangeDTO priceRangeDTO1 = new PriceRangeDTO();
        priceRangeDTO1.setId(1L);
        PriceRangeDTO priceRangeDTO2 = new PriceRangeDTO();
        assertThat(priceRangeDTO1).isNotEqualTo(priceRangeDTO2);
        priceRangeDTO2.setId(priceRangeDTO1.getId());
        assertThat(priceRangeDTO1).isEqualTo(priceRangeDTO2);
        priceRangeDTO2.setId(2L);
        assertThat(priceRangeDTO1).isNotEqualTo(priceRangeDTO2);
        priceRangeDTO1.setId(null);
        assertThat(priceRangeDTO1).isNotEqualTo(priceRangeDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(priceRangeMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(priceRangeMapper.fromId(null)).isNull();
    }
}
