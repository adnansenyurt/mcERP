package com.mobilechip.erp.service.mapper;

import com.mobilechip.erp.domain.*;
import com.mobilechip.erp.service.dto.SupplyStockDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity SupplyStock and its DTO SupplyStockDTO.
 */
@Mapper(componentModel = "spring", uses = {SupplyPartMapper.class})
public interface SupplyStockMapper extends EntityMapper<SupplyStockDTO, SupplyStock> {

    @Mapping(source = "supplyPart.id", target = "supplyPartId")
    SupplyStockDTO toDto(SupplyStock supplyStock);

    @Mapping(source = "supplyPartId", target = "supplyPart")
    SupplyStock toEntity(SupplyStockDTO supplyStockDTO);

    default SupplyStock fromId(Long id) {
        if (id == null) {
            return null;
        }
        SupplyStock supplyStock = new SupplyStock();
        supplyStock.setId(id);
        return supplyStock;
    }
}
