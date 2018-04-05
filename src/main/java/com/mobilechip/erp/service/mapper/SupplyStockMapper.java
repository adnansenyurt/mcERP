package com.mobilechip.erp.service.mapper;

import com.mobilechip.erp.domain.*;
import com.mobilechip.erp.service.dto.SupplyStockDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity SupplyStock and its DTO SupplyStockDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface SupplyStockMapper extends EntityMapper<SupplyStockDTO, SupplyStock> {


    @Mapping(target = "parts", ignore = true)
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
