package com.mobilechip.erp.web.rest;

import com.mobilechip.erp.McErpApp;

import com.mobilechip.erp.domain.CashFlow;
import com.mobilechip.erp.repository.CashFlowRepository;
import com.mobilechip.erp.service.CashFlowService;
import com.mobilechip.erp.service.dto.CashFlowDTO;
import com.mobilechip.erp.service.mapper.CashFlowMapper;
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

import com.mobilechip.erp.domain.enumeration.CashFlowDirection;
import com.mobilechip.erp.domain.enumeration.CashFlowType;
import com.mobilechip.erp.domain.enumeration.CashFlowStatus;
/**
 * Test class for the CashFlowResource REST controller.
 *
 * @see CashFlowResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = McErpApp.class)
public class CashFlowResourceIntTest {

    private static final Instant DEFAULT_DATE_PAYMENT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE_PAYMENT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final CashFlowDirection DEFAULT_DIRECTION = CashFlowDirection.IN;
    private static final CashFlowDirection UPDATED_DIRECTION = CashFlowDirection.OUT;

    private static final CashFlowType DEFAULT_TYPE = CashFlowType.INVOICE;
    private static final CashFlowType UPDATED_TYPE = CashFlowType.ALLOWANCE;

    private static final Long DEFAULT_AMOUNT = 1L;
    private static final Long UPDATED_AMOUNT = 2L;

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final CashFlowStatus DEFAULT_CURRENT_STATUS = CashFlowStatus.DUE;
    private static final CashFlowStatus UPDATED_CURRENT_STATUS = CashFlowStatus.PAID;

    @Autowired
    private CashFlowRepository cashFlowRepository;

    @Autowired
    private CashFlowMapper cashFlowMapper;

    @Autowired
    private CashFlowService cashFlowService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCashFlowMockMvc;

    private CashFlow cashFlow;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CashFlowResource cashFlowResource = new CashFlowResource(cashFlowService);
        this.restCashFlowMockMvc = MockMvcBuilders.standaloneSetup(cashFlowResource)
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
    public static CashFlow createEntity(EntityManager em) {
        CashFlow cashFlow = new CashFlow()
            .datePayment(DEFAULT_DATE_PAYMENT)
            .direction(DEFAULT_DIRECTION)
            .type(DEFAULT_TYPE)
            .amount(DEFAULT_AMOUNT)
            .description(DEFAULT_DESCRIPTION)
            .currentStatus(DEFAULT_CURRENT_STATUS);
        return cashFlow;
    }

    @Before
    public void initTest() {
        cashFlow = createEntity(em);
    }

    @Test
    @Transactional
    public void createCashFlow() throws Exception {
        int databaseSizeBeforeCreate = cashFlowRepository.findAll().size();

        // Create the CashFlow
        CashFlowDTO cashFlowDTO = cashFlowMapper.toDto(cashFlow);
        restCashFlowMockMvc.perform(post("/api/cash-flows")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cashFlowDTO)))
            .andExpect(status().isCreated());

        // Validate the CashFlow in the database
        List<CashFlow> cashFlowList = cashFlowRepository.findAll();
        assertThat(cashFlowList).hasSize(databaseSizeBeforeCreate + 1);
        CashFlow testCashFlow = cashFlowList.get(cashFlowList.size() - 1);
        assertThat(testCashFlow.getDatePayment()).isEqualTo(DEFAULT_DATE_PAYMENT);
        assertThat(testCashFlow.getDirection()).isEqualTo(DEFAULT_DIRECTION);
        assertThat(testCashFlow.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testCashFlow.getAmount()).isEqualTo(DEFAULT_AMOUNT);
        assertThat(testCashFlow.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testCashFlow.getCurrentStatus()).isEqualTo(DEFAULT_CURRENT_STATUS);
    }

    @Test
    @Transactional
    public void createCashFlowWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = cashFlowRepository.findAll().size();

        // Create the CashFlow with an existing ID
        cashFlow.setId(1L);
        CashFlowDTO cashFlowDTO = cashFlowMapper.toDto(cashFlow);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCashFlowMockMvc.perform(post("/api/cash-flows")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cashFlowDTO)))
            .andExpect(status().isBadRequest());

        // Validate the CashFlow in the database
        List<CashFlow> cashFlowList = cashFlowRepository.findAll();
        assertThat(cashFlowList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkDatePaymentIsRequired() throws Exception {
        int databaseSizeBeforeTest = cashFlowRepository.findAll().size();
        // set the field null
        cashFlow.setDatePayment(null);

        // Create the CashFlow, which fails.
        CashFlowDTO cashFlowDTO = cashFlowMapper.toDto(cashFlow);

        restCashFlowMockMvc.perform(post("/api/cash-flows")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cashFlowDTO)))
            .andExpect(status().isBadRequest());

        List<CashFlow> cashFlowList = cashFlowRepository.findAll();
        assertThat(cashFlowList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDirectionIsRequired() throws Exception {
        int databaseSizeBeforeTest = cashFlowRepository.findAll().size();
        // set the field null
        cashFlow.setDirection(null);

        // Create the CashFlow, which fails.
        CashFlowDTO cashFlowDTO = cashFlowMapper.toDto(cashFlow);

        restCashFlowMockMvc.perform(post("/api/cash-flows")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cashFlowDTO)))
            .andExpect(status().isBadRequest());

        List<CashFlow> cashFlowList = cashFlowRepository.findAll();
        assertThat(cashFlowList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTypeIsRequired() throws Exception {
        int databaseSizeBeforeTest = cashFlowRepository.findAll().size();
        // set the field null
        cashFlow.setType(null);

        // Create the CashFlow, which fails.
        CashFlowDTO cashFlowDTO = cashFlowMapper.toDto(cashFlow);

        restCashFlowMockMvc.perform(post("/api/cash-flows")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cashFlowDTO)))
            .andExpect(status().isBadRequest());

        List<CashFlow> cashFlowList = cashFlowRepository.findAll();
        assertThat(cashFlowList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkAmountIsRequired() throws Exception {
        int databaseSizeBeforeTest = cashFlowRepository.findAll().size();
        // set the field null
        cashFlow.setAmount(null);

        // Create the CashFlow, which fails.
        CashFlowDTO cashFlowDTO = cashFlowMapper.toDto(cashFlow);

        restCashFlowMockMvc.perform(post("/api/cash-flows")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cashFlowDTO)))
            .andExpect(status().isBadRequest());

        List<CashFlow> cashFlowList = cashFlowRepository.findAll();
        assertThat(cashFlowList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCurrentStatusIsRequired() throws Exception {
        int databaseSizeBeforeTest = cashFlowRepository.findAll().size();
        // set the field null
        cashFlow.setCurrentStatus(null);

        // Create the CashFlow, which fails.
        CashFlowDTO cashFlowDTO = cashFlowMapper.toDto(cashFlow);

        restCashFlowMockMvc.perform(post("/api/cash-flows")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cashFlowDTO)))
            .andExpect(status().isBadRequest());

        List<CashFlow> cashFlowList = cashFlowRepository.findAll();
        assertThat(cashFlowList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCashFlows() throws Exception {
        // Initialize the database
        cashFlowRepository.saveAndFlush(cashFlow);

        // Get all the cashFlowList
        restCashFlowMockMvc.perform(get("/api/cash-flows?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cashFlow.getId().intValue())))
            .andExpect(jsonPath("$.[*].datePayment").value(hasItem(DEFAULT_DATE_PAYMENT.toString())))
            .andExpect(jsonPath("$.[*].direction").value(hasItem(DEFAULT_DIRECTION.toString())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].amount").value(hasItem(DEFAULT_AMOUNT.intValue())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].currentStatus").value(hasItem(DEFAULT_CURRENT_STATUS.toString())));
    }

    @Test
    @Transactional
    public void getCashFlow() throws Exception {
        // Initialize the database
        cashFlowRepository.saveAndFlush(cashFlow);

        // Get the cashFlow
        restCashFlowMockMvc.perform(get("/api/cash-flows/{id}", cashFlow.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(cashFlow.getId().intValue()))
            .andExpect(jsonPath("$.datePayment").value(DEFAULT_DATE_PAYMENT.toString()))
            .andExpect(jsonPath("$.direction").value(DEFAULT_DIRECTION.toString()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()))
            .andExpect(jsonPath("$.amount").value(DEFAULT_AMOUNT.intValue()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.currentStatus").value(DEFAULT_CURRENT_STATUS.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCashFlow() throws Exception {
        // Get the cashFlow
        restCashFlowMockMvc.perform(get("/api/cash-flows/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCashFlow() throws Exception {
        // Initialize the database
        cashFlowRepository.saveAndFlush(cashFlow);
        int databaseSizeBeforeUpdate = cashFlowRepository.findAll().size();

        // Update the cashFlow
        CashFlow updatedCashFlow = cashFlowRepository.findOne(cashFlow.getId());
        // Disconnect from session so that the updates on updatedCashFlow are not directly saved in db
        em.detach(updatedCashFlow);
        updatedCashFlow
            .datePayment(UPDATED_DATE_PAYMENT)
            .direction(UPDATED_DIRECTION)
            .type(UPDATED_TYPE)
            .amount(UPDATED_AMOUNT)
            .description(UPDATED_DESCRIPTION)
            .currentStatus(UPDATED_CURRENT_STATUS);
        CashFlowDTO cashFlowDTO = cashFlowMapper.toDto(updatedCashFlow);

        restCashFlowMockMvc.perform(put("/api/cash-flows")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cashFlowDTO)))
            .andExpect(status().isOk());

        // Validate the CashFlow in the database
        List<CashFlow> cashFlowList = cashFlowRepository.findAll();
        assertThat(cashFlowList).hasSize(databaseSizeBeforeUpdate);
        CashFlow testCashFlow = cashFlowList.get(cashFlowList.size() - 1);
        assertThat(testCashFlow.getDatePayment()).isEqualTo(UPDATED_DATE_PAYMENT);
        assertThat(testCashFlow.getDirection()).isEqualTo(UPDATED_DIRECTION);
        assertThat(testCashFlow.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testCashFlow.getAmount()).isEqualTo(UPDATED_AMOUNT);
        assertThat(testCashFlow.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testCashFlow.getCurrentStatus()).isEqualTo(UPDATED_CURRENT_STATUS);
    }

    @Test
    @Transactional
    public void updateNonExistingCashFlow() throws Exception {
        int databaseSizeBeforeUpdate = cashFlowRepository.findAll().size();

        // Create the CashFlow
        CashFlowDTO cashFlowDTO = cashFlowMapper.toDto(cashFlow);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCashFlowMockMvc.perform(put("/api/cash-flows")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cashFlowDTO)))
            .andExpect(status().isCreated());

        // Validate the CashFlow in the database
        List<CashFlow> cashFlowList = cashFlowRepository.findAll();
        assertThat(cashFlowList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteCashFlow() throws Exception {
        // Initialize the database
        cashFlowRepository.saveAndFlush(cashFlow);
        int databaseSizeBeforeDelete = cashFlowRepository.findAll().size();

        // Get the cashFlow
        restCashFlowMockMvc.perform(delete("/api/cash-flows/{id}", cashFlow.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<CashFlow> cashFlowList = cashFlowRepository.findAll();
        assertThat(cashFlowList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CashFlow.class);
        CashFlow cashFlow1 = new CashFlow();
        cashFlow1.setId(1L);
        CashFlow cashFlow2 = new CashFlow();
        cashFlow2.setId(cashFlow1.getId());
        assertThat(cashFlow1).isEqualTo(cashFlow2);
        cashFlow2.setId(2L);
        assertThat(cashFlow1).isNotEqualTo(cashFlow2);
        cashFlow1.setId(null);
        assertThat(cashFlow1).isNotEqualTo(cashFlow2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(CashFlowDTO.class);
        CashFlowDTO cashFlowDTO1 = new CashFlowDTO();
        cashFlowDTO1.setId(1L);
        CashFlowDTO cashFlowDTO2 = new CashFlowDTO();
        assertThat(cashFlowDTO1).isNotEqualTo(cashFlowDTO2);
        cashFlowDTO2.setId(cashFlowDTO1.getId());
        assertThat(cashFlowDTO1).isEqualTo(cashFlowDTO2);
        cashFlowDTO2.setId(2L);
        assertThat(cashFlowDTO1).isNotEqualTo(cashFlowDTO2);
        cashFlowDTO1.setId(null);
        assertThat(cashFlowDTO1).isNotEqualTo(cashFlowDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(cashFlowMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(cashFlowMapper.fromId(null)).isNull();
    }
}
