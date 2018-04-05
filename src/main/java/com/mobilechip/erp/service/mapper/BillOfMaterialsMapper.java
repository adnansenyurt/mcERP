package com.mobilechip.erp.service.mapper;

import com.mobilechip.erp.domain.*;
import com.mobilechip.erp.service.dto.BillOfMaterialsDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity BillOfMaterials and its DTO BillOfMaterialsDTO.
 */
@Mapper(componentModel = "spring", uses = {ProductMapper.class})
public interface BillOfMaterialsMapper extends EntityMapper<BillOfMaterialsDTO, BillOfMaterials> {

    @Mapping(source = "product.id", target = "productId")
    BillOfMaterialsDTO toDto(BillOfMaterials billOfMaterials);

    @Mapping(source = "productId", target = "product")
    @Mapping(target = "supplyParts", ignore = true)
    BillOfMaterials toEntity(BillOfMaterialsDTO billOfMaterialsDTO);

    default BillOfMaterials fromId(Long id) {
        if (id == null) {
            return null;
        }
        BillOfMaterials billOfMaterials = new BillOfMaterials();
        billOfMaterials.setId(id);
        return billOfMaterials;
    }
}
