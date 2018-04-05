package com.mobilechip.erp.service.mapper;

import com.mobilechip.erp.domain.*;
import com.mobilechip.erp.service.dto.SupplierContractDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity SupplierContract and its DTO SupplierContractDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface SupplierContractMapper extends EntityMapper<SupplierContractDTO, SupplierContract> {


    @Mapping(target = "purchaseOrders", ignore = true)
    @Mapping(target = "supplyPartContracts", ignore = true)
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
