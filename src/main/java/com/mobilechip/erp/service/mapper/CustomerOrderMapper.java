package com.mobilechip.erp.service.mapper;

import com.mobilechip.erp.domain.*;
import com.mobilechip.erp.service.dto.CustomerOrderDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity CustomerOrder and its DTO CustomerOrderDTO.
 */
@Mapper(componentModel = "spring", uses = {CustomerMapper.class})
public interface CustomerOrderMapper extends EntityMapper<CustomerOrderDTO, CustomerOrder> {

    @Mapping(source = "customer.id", target = "customerId")
    CustomerOrderDTO toDto(CustomerOrder customerOrder);

    @Mapping(source = "customerId", target = "customer")
    @Mapping(target = "cashFlows", ignore = true)
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
