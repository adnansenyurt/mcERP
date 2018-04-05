package com.mobilechip.erp.service.mapper;

import com.mobilechip.erp.domain.*;
import com.mobilechip.erp.service.dto.CustomerDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Customer and its DTO CustomerDTO.
 */
@Mapper(componentModel = "spring", uses = {ContactPersonMapper.class, CustomerOrderMapper.class, InvoiceMapper.class, CustomerProposalMapper.class})
public interface CustomerMapper extends EntityMapper<CustomerDTO, Customer> {

    @Mapping(source = "contactPerson.id", target = "contactPersonId")
    @Mapping(source = "customerOrder.id", target = "customerOrderId")
    @Mapping(source = "invoice.id", target = "invoiceId")
    @Mapping(source = "customerProposal.id", target = "customerProposalId")
    CustomerDTO toDto(Customer customer);

    @Mapping(target = "opportunities", ignore = true)
    @Mapping(source = "contactPersonId", target = "contactPerson")
    @Mapping(source = "customerOrderId", target = "customerOrder")
    @Mapping(source = "invoiceId", target = "invoice")
    @Mapping(source = "customerProposalId", target = "customerProposal")
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
