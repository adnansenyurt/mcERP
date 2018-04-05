package com.mobilechip.erp.service.mapper;

import com.mobilechip.erp.domain.*;
import com.mobilechip.erp.service.dto.CustomerOrderDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity CustomerOrder and its DTO CustomerOrderDTO.
 */
@Mapper(componentModel = "spring", uses = {CashFlowMapper.class})
public interface CustomerOrderMapper extends EntityMapper<CustomerOrderDTO, CustomerOrder> {

    @Mapping(source = "cashFlow.id", target = "cashFlowId")
    CustomerOrderDTO toDto(CustomerOrder customerOrder);

    @Mapping(target = "customers", ignore = true)
    @Mapping(source = "cashFlowId", target = "cashFlow")
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
