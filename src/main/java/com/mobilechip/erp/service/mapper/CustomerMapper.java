package com.mobilechip.erp.service.mapper;

import com.mobilechip.erp.domain.*;
import com.mobilechip.erp.service.dto.CustomerDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Customer and its DTO CustomerDTO.
 */
@Mapper(componentModel = "spring", uses = {OpportunityMapper.class})
public interface CustomerMapper extends EntityMapper<CustomerDTO, Customer> {

    @Mapping(source = "opportunity.id", target = "opportunityId")
    @Mapping(source = "opportunity.name", target = "opportunityName")
    CustomerDTO toDto(Customer customer);

    @Mapping(target = "orders", ignore = true)
    @Mapping(target = "contactPeople", ignore = true)
    @Mapping(target = "customerProposals", ignore = true)
    @Mapping(target = "invoices", ignore = true)
    @Mapping(source = "opportunityId", target = "opportunity")
    Customer toEntity(CustomerDTO customerDTO);

    default Customer fromId(Long id) {
        if (id == null) {
            return null;
        }
        Customer customer = new Customer();
        customer.setId(id);
        return customer;
    }
}
