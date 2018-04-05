package com.mobilechip.erp.service.mapper;

import com.mobilechip.erp.domain.*;
import com.mobilechip.erp.service.dto.PurchaseOrderDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity PurchaseOrder and its DTO PurchaseOrderDTO.
 */
@Mapper(componentModel = "spring", uses = {SupplierMapper.class, SupplierContractMapper.class})
public interface PurchaseOrderMapper extends EntityMapper<PurchaseOrderDTO, PurchaseOrder> {

    @Mapping(source = "supplier.id", target = "supplierId")
    @Mapping(source = "supplierContract.id", target = "supplierContractId")
    PurchaseOrderDTO toDto(PurchaseOrder purchaseOrder);

    @Mapping(source = "supplierId", target = "supplier")
    @Mapping(target = "cashFlows", ignore = true)
    @Mapping(source = "supplierContractId", target = "supplierContract")
    PurchaseOrder toEntity(PurchaseOrderDTO purchaseOrderDTO);

    default PurchaseOrder fromId(Long id) {
        if (id == null) {
            return null;
        }
        PurchaseOrder purchaseOrder = new PurchaseOrder();
        purchaseOrder.setId(id);
        return purchaseOrder;
    }
}
