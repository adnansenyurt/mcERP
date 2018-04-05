package com.mobilechip.erp.service.mapper;

import com.mobilechip.erp.domain.*;
import com.mobilechip.erp.service.dto.PriceRangeDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity PriceRange and its DTO PriceRangeDTO.
 */
@Mapper(componentModel = "spring", uses = {SupplyPartContractMapper.class})
public interface PriceRangeMapper extends EntityMapper<PriceRangeDTO, PriceRange> {

    @Mapping(source = "contract.id", target = "contractId")
    PriceRangeDTO toDto(PriceRange priceRange);

    @Mapping(source = "contractId", target = "contract")
    PriceRange toEntity(PriceRangeDTO priceRangeDTO);

    default PriceRange fromId(Long id) {
        if (id == null) {
            return null;
        }
        PriceRange priceRange = new PriceRange();
        priceRange.setId(id);
        return priceRange;
    }
}
