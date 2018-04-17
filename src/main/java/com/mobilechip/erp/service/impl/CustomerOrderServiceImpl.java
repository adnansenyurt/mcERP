package com.mobilechip.erp.service.impl;

import com.mobilechip.erp.service.CustomerOrderService;
import com.mobilechip.erp.domain.CustomerOrder;
import com.mobilechip.erp.repository.CustomerOrderRepository;
import com.mobilechip.erp.service.dto.CustomerOrderDTO;
import com.mobilechip.erp.service.mapper.CustomerOrderMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * Service Implementation for managing CustomerOrder.
 */
@Service
@Transactional
public class CustomerOrderServiceImpl implements CustomerOrderService {

    private final Logger log = LoggerFactory.getLogger(CustomerOrderServiceImpl.class);

    private final CustomerOrderRepository customerOrderRepository;

    private final CustomerOrderMapper customerOrderMapper;

    public CustomerOrderServiceImpl(CustomerOrderRepository customerOrderRepository, CustomerOrderMapper customerOrderMapper) {
        this.customerOrderRepository = customerOrderRepository;
        this.customerOrderMapper = customerOrderMapper;
    }

    /**
     * Save a customerOrder.
     *
     * @param customerOrderDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public CustomerOrderDTO save(CustomerOrderDTO customerOrderDTO) {
        log.debug("Request to save CustomerOrder : {}", customerOrderDTO);
        CustomerOrder customerOrder = customerOrderMapper.toEntity(customerOrderDTO);
        customerOrder = customerOrderRepository.save(customerOrder);
        return customerOrderMapper.toDto(customerOrder);
    }

    /**
     * Get all the customerOrders.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<CustomerOrderDTO> findAll() {
        log.debug("Request to get all CustomerOrders");
        return customerOrderRepository.findAll().stream()
            .map(customerOrderMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     *  get all the customerOrders where Invoice is null.
     *  @return the list of entities
     */
    @Transactional(readOnly = true) 
    public List<CustomerOrderDTO> findAllWhereInvoiceIsNull() {
        log.debug("Request to get all customerOrders where Invoice is null");
        return StreamSupport
            .stream(customerOrderRepository.findAll().spliterator(), false)
            .filter(customerOrder -> customerOrder.getInvoice() == null)
            .map(customerOrderMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one customerOrder by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public CustomerOrderDTO findOne(Long id) {
        log.debug("Request to get CustomerOrder : {}", id);
        CustomerOrder customerOrder = customerOrderRepository.findOne(id);
        return customerOrderMapper.toDto(customerOrder);
    }

    /**
     * Delete the customerOrder by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete CustomerOrder : {}", id);
        customerOrderRepository.delete(id);
    }
}
