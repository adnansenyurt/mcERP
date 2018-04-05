package com.mobilechip.erp.service.mapper;

import com.mobilechip.erp.domain.*;
import com.mobilechip.erp.service.dto.SupplyPartContractDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity SupplyPartContract and its DTO SupplyPartContractDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface SupplyPartContractMapper extends EntityMapper<SupplyPartContractDTO, SupplyPartContract> {


    @Mapping(target = "contracts", ignore = true)
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
