package com.mobilechip.erp.service.mapper;

import com.mobilechip.erp.domain.*;
import com.mobilechip.erp.service.dto.SupplierDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Supplier and its DTO SupplierDTO.
 */
@Mapper(componentModel = "spring", uses = {ContactPersonMapper.class, PurchaseOrderMapper.class})
public interface SupplierMapper extends EntityMapper<SupplierDTO, Supplier> {

    @Mapping(source = "contactPerson.id", target = "contactPersonId")
    @Mapping(source = "purchaseOrder.id", target = "purchaseOrderId")
    SupplierDTO toDto(Supplier supplier);

    @Mapping(source = "contactPersonId", target = "contactPerson")
    @Mapping(source = "purchaseOrderId", target = "purchaseOrder")
    Supplier toEntity(SupplierDTO supplierDTO);

    default Supplier fromId(Long id) {
        if (id == null) {
            return null;
        }
        Supplier supplier = new Supplier();
        supplier.setId(id);
        return supplier;
    }
}
