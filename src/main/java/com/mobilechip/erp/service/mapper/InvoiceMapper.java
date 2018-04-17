package com.mobilechip.erp.service.mapper;

import com.mobilechip.erp.domain.*;
import com.mobilechip.erp.service.dto.InvoiceDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Invoice and its DTO InvoiceDTO.
 */
@Mapper(componentModel = "spring", uses = {CustomerOrderMapper.class, CustomerMapper.class})
public interface InvoiceMapper extends EntityMapper<InvoiceDTO, Invoice> {

    @Mapping(source = "customerOrder.id", target = "customerOrderId")
    @Mapping(source = "customerOrder.name", target = "customerOrderName")
    @Mapping(source = "customer.id", target = "customerId")
    InvoiceDTO toDto(Invoice invoice);

    @Mapping(source = "customerOrderId", target = "customerOrder")
    @Mapping(source = "customerId", target = "customer")
    Invoice toEntity(InvoiceDTO invoiceDTO);

    default Invoice fromId(Long id) {
        if (id == null) {
            return null;
        }
        Invoice invoice = new Invoice();
        invoice.setId(id);
        return invoice;
    }
}
