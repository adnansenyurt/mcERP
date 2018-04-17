package com.mobilechip.erp.service.mapper;

import com.mobilechip.erp.domain.*;
import com.mobilechip.erp.service.dto.SupplyPartDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity SupplyPart and its DTO SupplyPartDTO.
 */
@Mapper(componentModel = "spring", uses = {SupplyPartContractMapper.class, BillOfMaterialsMapper.class})
public interface SupplyPartMapper extends EntityMapper<SupplyPartDTO, SupplyPart> {

    @Mapping(source = "contract.id", target = "contractId")
    @Mapping(source = "bom.id", target = "bomId")
    SupplyPartDTO toDto(SupplyPart supplyPart);

    @Mapping(source = "contractId", target = "contract")
    @Mapping(target = "supplyStocks", ignore = true)
    @Mapping(source = "bomId", target = "bom")
    SupplyPart toEntity(SupplyPartDTO supplyPartDTO);

    default SupplyPart fromId(Long id) {
        if (id == null) {
            return null;
        }
        SupplyPart supplyPart = new SupplyPart();
        supplyPart.setId(id);
        return supplyPart;
    }
}
