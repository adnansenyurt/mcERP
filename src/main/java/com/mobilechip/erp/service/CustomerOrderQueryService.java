package com.mobilechip.erp.service;


import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specifications;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import io.github.jhipster.service.QueryService;

import com.mobilechip.erp.domain.CustomerOrder;
import com.mobilechip.erp.domain.*; // for static metamodels
import com.mobilechip.erp.repository.CustomerOrderRepository;
import com.mobilechip.erp.service.dto.CustomerOrderCriteria;

import com.mobilechip.erp.service.dto.CustomerOrderDTO;
import com.mobilechip.erp.service.mapper.CustomerOrderMapper;
import com.mobilechip.erp.domain.enumeration.CustomerOrderStatus;

/**
 * Service for executing complex queries for CustomerOrder entities in the database.
 * The main input is a {@link CustomerOrderCriteria} which get's converted to {@link Specifications},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link CustomerOrderDTO} or a {@link Page} of {@link CustomerOrderDTO} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class CustomerOrderQueryService extends QueryService<CustomerOrder> {

    private final Logger log = LoggerFactory.getLogger(CustomerOrderQueryService.class);


    private final CustomerOrderRepository customerOrderRepository;

    private final CustomerOrderMapper customerOrderMapper;

    public CustomerOrderQueryService(CustomerOrderRepository customerOrderRepository, CustomerOrderMapper customerOrderMapper) {
        this.customerOrderRepository = customerOrderRepository;
        this.customerOrderMapper = customerOrderMapper;
    }

    /**
     * Return a {@link List} of {@link CustomerOrderDTO} which matches the criteria from the database
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<CustomerOrderDTO> findByCriteria(CustomerOrderCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specifications<CustomerOrder> specification = createSpecification(criteria);
        return customerOrderMapper.toDto(customerOrderRepository.findAll(specification));
    }

    /**
     * Return a {@link Page} of {@link CustomerOrderDTO} which matches the criteria from the database
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<CustomerOrderDTO> findByCriteria(CustomerOrderCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specifications<CustomerOrder> specification = createSpecification(criteria);
        final Page<CustomerOrder> result = customerOrderRepository.findAll(specification, page);
        return result.map(customerOrderMapper::toDto);
    }

    /**
     * Function to convert CustomerOrderCriteria to a {@link Specifications}
     */
    private Specifications<CustomerOrder> createSpecification(CustomerOrderCriteria criteria) {
        Specifications<CustomerOrder> specification = Specifications.where(null);
        if (criteria != null) {
            if (criteria.getId() != null) {
                specification = specification.and(buildSpecification(criteria.getId(), CustomerOrder_.id));
            }
            if (criteria.getName() != null) {
                specification = specification.and(buildStringSpecification(criteria.getName(), CustomerOrder_.name));
            }
            if (criteria.getDateOpened() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getDateOpened(), CustomerOrder_.dateOpened));
            }
            if (criteria.getDatePaymentDue() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getDatePaymentDue(), CustomerOrder_.datePaymentDue));
            }
            if (criteria.getAmount() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getAmount(), CustomerOrder_.amount));
            }
            if (criteria.getCurrentStatus() != null) {
                specification = specification.and(buildSpecification(criteria.getCurrentStatus(), CustomerOrder_.currentStatus));
            }
            if (criteria.getProposalId() != null) {
                specification = specification.and(buildReferringEntitySpecification(criteria.getProposalId(), CustomerOrder_.proposal, CustomerProposal_.id));
            }
            if (criteria.getCashFlowId() != null) {
                specification = specification.and(buildReferringEntitySpecification(criteria.getCashFlowId(), CustomerOrder_.cashFlows, CashFlow_.id));
            }
            if (criteria.getInvoiceId() != null) {
                specification = specification.and(buildReferringEntitySpecification(criteria.getInvoiceId(), CustomerOrder_.invoice, Invoice_.id));
            }
            if (criteria.getCustomerId() != null) {
                specification = specification.and(buildReferringEntitySpecification(criteria.getCustomerId(), CustomerOrder_.customer, Customer_.id));
            }
        }
        return specification;
    }

}
