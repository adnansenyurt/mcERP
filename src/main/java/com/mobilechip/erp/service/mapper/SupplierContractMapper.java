package com.mobilechip.erp.service.mapper;

import com.mobilechip.erp.domain.*;
import com.mobilechip.erp.service.dto.SupplierContractDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity SupplierContract and its DTO SupplierContractDTO.
 */
@Mapper(componentModel = "spring", uses = {PurchaseOrderMapper.class, SupplyPartContractMapper.class})
public interface SupplierContractMapper extends EntityMapper<SupplierContractDTO, SupplierContract> {

    @Mapping(source = "purchaseOrder.id", target = "purchaseOrderId")
    @Mapping(source = "supplyPartContract.id", target = "supplyPartContractId")
    SupplierContractDTO toDto(SupplierContract supplierContract);

    @Mapping(source = "purchaseOrderId", target = "purchaseOrder")
    @Mapping(source = "supplyPartContractId", target = "supplyPartContract")
    SupplierContract toEntity(SupplierContractDTO supplierContractDTO);

    default SupplierContract fromId(Long id) {
        if (id == null) {
            return null;
        }
        SupplierContract supplierContract = new SupplierContract();
        supplierContract.setId(id);
        return supplierContract;
    }
}
