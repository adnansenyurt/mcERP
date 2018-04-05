package com.mobilechip.erp.service.mapper;

import com.mobilechip.erp.domain.*;
import com.mobilechip.erp.service.dto.SupplyPartContractDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity SupplyPartContract and its DTO SupplyPartContractDTO.
 */
@Mapper(componentModel = "spring", uses = {SupplierContractMapper.class})
public interface SupplyPartContractMapper extends EntityMapper<SupplyPartContractDTO, SupplyPartContract> {

    @Mapping(source = "supplierContract.id", target = "supplierContractId")
    SupplyPartContractDTO toDto(SupplyPartContract supplyPartContract);

    @Mapping(source = "supplierContractId", target = "supplierContract")
    SupplyPartContract toEntity(SupplyPartContractDTO supplyPartContractDTO);

    default SupplyPartContract fromId(Long id) {
        if (id == null) {
            return null;
        }
        SupplyPartContract supplyPartContract = new SupplyPartContract();
        supplyPartContract.setId(id);
        return supplyPartContract;
    }
}
