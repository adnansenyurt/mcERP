package com.mobilechip.erp.service.mapper;

import com.mobilechip.erp.domain.*;
import com.mobilechip.erp.service.dto.CustomerOrderDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity CustomerOrder and its DTO CustomerOrderDTO.
 */
@Mapper(componentModel = "spring", uses = {CustomerProposalMapper.class, CustomerMapper.class})
public interface CustomerOrderMapper extends EntityMapper<CustomerOrderDTO, CustomerOrder> {

    @Mapping(source = "proposal.id", target = "proposalId")
    @Mapping(source = "customer.id", target = "customerId")
    @Mapping(source = "customer.name", target = "customerName")
    CustomerOrderDTO toDto(CustomerOrder customerOrder);

    @Mapping(source = "proposalId", target = "proposal")
    @Mapping(target = "cashFlows", ignore = true)
    @Mapping(target = "invoice", ignore = true)
    @Mapping(source = "customerId", target = "customer")
    CustomerOrder toEntity(CustomerOrderDTO customerOrderDTO);

    default CustomerOrder fromId(Long id) {
        if (id == null) {
            return null;
        }
        CustomerOrder customerOrder = new CustomerOrder();
        customerOrder.setId(id);
        return customerOrder;
    }
}
