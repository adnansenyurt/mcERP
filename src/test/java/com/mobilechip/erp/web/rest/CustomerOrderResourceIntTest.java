package com.mobilechip.erp.web.rest;

import com.mobilechip.erp.McErpApp;

import com.mobilechip.erp.domain.CustomerOrder;
import com.mobilechip.erp.repository.CustomerOrderRepository;
import com.mobilechip.erp.service.CustomerOrderService;
import com.mobilechip.erp.service.dto.CustomerOrderDTO;
import com.mobilechip.erp.service.mapper.CustomerOrderMapper;
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

import com.mobilechip.erp.domain.enumeration.CustomerOrderStatus;
/**
 * Test class for the CustomerOrderResource REST controller.
 *
 * @see CustomerOrderResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = McErpApp.class)
public class CustomerOrderResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Instant DEFAULT_DATE_OPENED = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE_OPENED = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_DATE_PAYMENT_DUE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE_PAYMENT_DUE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Long DEFAULT_AMOUNT = 1L;
    private static final Long UPDATED_AMOUNT = 2L;

    private static final CustomerOrderStatus DEFAULT_CURRENT_STATUS = CustomerOrderStatus.RECEIVED;
    private static final CustomerOrderStatus UPDATED_CURRENT_STATUS = CustomerOrderStatus.INVOICED;

    @Autowired
    private CustomerOrderRepository customerOrderRepository;

    @Autowired
    private CustomerOrderMapper customerOrderMapper;

    @Autowired
    private CustomerOrderService customerOrderService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCustomerOrderMockMvc;

    private CustomerOrder customerOrder;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CustomerOrderResource customerOrderResource = new CustomerOrderResource(customerOrderService);
        this.restCustomerOrderMockMvc = MockMvcBuilders.standaloneSetup(customerOrderResource)
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
    public static CustomerOrder createEntity(EntityManager em) {
        CustomerOrder customerOrder = new CustomerOrder()
            .name(DEFAULT_NAME)
            .dateOpened(DEFAULT_DATE_OPENED)
            .datePaymentDue(DEFAULT_DATE_PAYMENT_DUE)
            .amount(DEFAULT_AMOUNT)
            .currentStatus(DEFAULT_CURRENT_STATUS);
        return customerOrder;
    }

    @Before
    public void initTest() {
        customerOrder = createEntity(em);
    }

    @Test
    @Transactional
    public void createCustomerOrder() throws Exception {
        int databaseSizeBeforeCreate = customerOrderRepository.findAll().size();

        // Create the CustomerOrder
        CustomerOrderDTO customerOrderDTO = customerOrderMapper.toDto(customerOrder);
        restCustomerOrderMockMvc.perform(post("/api/customer-orders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(customerOrderDTO)))
            .andExpect(status().isCreated());

        // Validate the CustomerOrder in the database
        List<CustomerOrder> customerOrderList = customerOrderRepository.findAll();
        assertThat(customerOrderList).hasSize(databaseSizeBeforeCreate + 1);
        CustomerOrder testCustomerOrder = customerOrderList.get(customerOrderList.size() - 1);
        assertThat(testCustomerOrder.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testCustomerOrder.getDateOpened()).isEqualTo(DEFAULT_DATE_OPENED);
        assertThat(testCustomerOrder.getDatePaymentDue()).isEqualTo(DEFAULT_DATE_PAYMENT_DUE);
        assertThat(testCustomerOrder.getAmount()).isEqualTo(DEFAULT_AMOUNT);
        assertThat(testCustomerOrder.getCurrentStatus()).isEqualTo(DEFAULT_CURRENT_STATUS);
    }

    @Test
    @Transactional
    public void createCustomerOrderWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = customerOrderRepository.findAll().size();

        // Create the CustomerOrder with an existing ID
        customerOrder.setId(1L);
        CustomerOrderDTO customerOrderDTO = customerOrderMapper.toDto(customerOrder);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCustomerOrderMockMvc.perform(post("/api/customer-orders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(customerOrderDTO)))
            .andExpect(status().isBadRequest());

        // Validate the CustomerOrder in the database
        List<CustomerOrder> customerOrderList = customerOrderRepository.findAll();
        assertThat(customerOrderList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = customerOrderRepository.findAll().size();
        // set the field null
        customerOrder.setName(null);

        // Create the CustomerOrder, which fails.
        CustomerOrderDTO customerOrderDTO = customerOrderMapper.toDto(customerOrder);

        restCustomerOrderMockMvc.perform(post("/api/customer-orders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(customerOrderDTO)))
            .andExpect(status().isBadRequest());

        List<CustomerOrder> customerOrderList = customerOrderRepository.findAll();
        assertThat(customerOrderList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDateOpenedIsRequired() throws Exception {
        int databaseSizeBeforeTest = customerOrderRepository.findAll().size();
        // set the field null
        customerOrder.setDateOpened(null);

        // Create the CustomerOrder, which fails.
        CustomerOrderDTO customerOrderDTO = customerOrderMapper.toDto(customerOrder);

        restCustomerOrderMockMvc.perform(post("/api/customer-orders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(customerOrderDTO)))
            .andExpect(status().isBadRequest());

        List<CustomerOrder> customerOrderList = customerOrderRepository.findAll();
        assertThat(customerOrderList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCustomerOrders() throws Exception {
        // Initialize the database
        customerOrderRepository.saveAndFlush(customerOrder);

        // Get all the customerOrderList
        restCustomerOrderMockMvc.perform(get("/api/customer-orders?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(customerOrder.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].dateOpened").value(hasItem(DEFAULT_DATE_OPENED.toString())))
            .andExpect(jsonPath("$.[*].datePaymentDue").value(hasItem(DEFAULT_DATE_PAYMENT_DUE.toString())))
            .andExpect(jsonPath("$.[*].amount").value(hasItem(DEFAULT_AMOUNT.intValue())))
            .andExpect(jsonPath("$.[*].currentStatus").value(hasItem(DEFAULT_CURRENT_STATUS.toString())));
    }

    @Test
    @Transactional
    public void getCustomerOrder() throws Exception {
        // Initialize the database
        customerOrderRepository.saveAndFlush(customerOrder);

        // Get the customerOrder
        restCustomerOrderMockMvc.perform(get("/api/customer-orders/{id}", customerOrder.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(customerOrder.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.dateOpened").value(DEFAULT_DATE_OPENED.toString()))
            .andExpect(jsonPath("$.datePaymentDue").value(DEFAULT_DATE_PAYMENT_DUE.toString()))
            .andExpect(jsonPath("$.amount").value(DEFAULT_AMOUNT.intValue()))
            .andExpect(jsonPath("$.currentStatus").value(DEFAULT_CURRENT_STATUS.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCustomerOrder() throws Exception {
        // Get the customerOrder
        restCustomerOrderMockMvc.perform(get("/api/customer-orders/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCustomerOrder() throws Exception {
        // Initialize the database
        customerOrderRepository.saveAndFlush(customerOrder);
        int databaseSizeBeforeUpdate = customerOrderRepository.findAll().size();

        // Update the customerOrder
        CustomerOrder updatedCustomerOrder = customerOrderRepository.findOne(customerOrder.getId());
        // Disconnect from session so that the updates on updatedCustomerOrder are not directly saved in db
        em.detach(updatedCustomerOrder);
        updatedCustomerOrder
            .name(UPDATED_NAME)
            .dateOpened(UPDATED_DATE_OPENED)
            .datePaymentDue(UPDATED_DATE_PAYMENT_DUE)
            .amount(UPDATED_AMOUNT)
            .currentStatus(UPDATED_CURRENT_STATUS);
        CustomerOrderDTO customerOrderDTO = customerOrderMapper.toDto(updatedCustomerOrder);

        restCustomerOrderMockMvc.perform(put("/api/customer-orders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(customerOrderDTO)))
            .andExpect(status().isOk());

        // Validate the CustomerOrder in the database
        List<CustomerOrder> customerOrderList = customerOrderRepository.findAll();
        assertThat(customerOrderList).hasSize(databaseSizeBeforeUpdate);
        CustomerOrder testCustomerOrder = customerOrderList.get(customerOrderList.size() - 1);
        assertThat(testCustomerOrder.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testCustomerOrder.getDateOpened()).isEqualTo(UPDATED_DATE_OPENED);
        assertThat(testCustomerOrder.getDatePaymentDue()).isEqualTo(UPDATED_DATE_PAYMENT_DUE);
        assertThat(testCustomerOrder.getAmount()).isEqualTo(UPDATED_AMOUNT);
        assertThat(testCustomerOrder.getCurrentStatus()).isEqualTo(UPDATED_CURRENT_STATUS);
    }

    @Test
    @Transactional
    public void updateNonExistingCustomerOrder() throws Exception {
        int databaseSizeBeforeUpdate = customerOrderRepository.findAll().size();

        // Create the CustomerOrder
        CustomerOrderDTO customerOrderDTO = customerOrderMapper.toDto(customerOrder);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCustomerOrderMockMvc.perform(put("/api/customer-orders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(customerOrderDTO)))
            .andExpect(status().isCreated());

        // Validate the CustomerOrder in the database
        List<CustomerOrder> customerOrderList = customerOrderRepository.findAll();
        assertThat(customerOrderList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteCustomerOrder() throws Exception {
        // Initialize the database
        customerOrderRepository.saveAndFlush(customerOrder);
        int databaseSizeBeforeDelete = customerOrderRepository.findAll().size();

        // Get the customerOrder
        restCustomerOrderMockMvc.perform(delete("/api/customer-orders/{id}", customerOrder.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<CustomerOrder> customerOrderList = customerOrderRepository.findAll();
        assertThat(customerOrderList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CustomerOrder.class);
        CustomerOrder customerOrder1 = new CustomerOrder();
        customerOrder1.setId(1L);
        CustomerOrder customerOrder2 = new CustomerOrder();
        customerOrder2.setId(customerOrder1.getId());
        assertThat(customerOrder1).isEqualTo(customerOrder2);
        customerOrder2.setId(2L);
        assertThat(customerOrder1).isNotEqualTo(customerOrder2);
        customerOrder1.setId(null);
        assertThat(customerOrder1).isNotEqualTo(customerOrder2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(CustomerOrderDTO.class);
        CustomerOrderDTO customerOrderDTO1 = new CustomerOrderDTO();
        customerOrderDTO1.setId(1L);
        CustomerOrderDTO customerOrderDTO2 = new CustomerOrderDTO();
        assertThat(customerOrderDTO1).isNotEqualTo(customerOrderDTO2);
        customerOrderDTO2.setId(customerOrderDTO1.getId());
        assertThat(customerOrderDTO1).isEqualTo(customerOrderDTO2);
        customerOrderDTO2.setId(2L);
        assertThat(customerOrderDTO1).isNotEqualTo(customerOrderDTO2);
        customerOrderDTO1.setId(null);
        assertThat(customerOrderDTO1).isNotEqualTo(customerOrderDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(customerOrderMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(customerOrderMapper.fromId(null)).isNull();
    }
}
