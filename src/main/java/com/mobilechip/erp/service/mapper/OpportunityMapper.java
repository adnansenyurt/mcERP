package com.mobilechip.erp.service.mapper;

import com.mobilechip.erp.domain.*;
import com.mobilechip.erp.service.dto.OpportunityDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Opportunity and its DTO OpportunityDTO.
 */
@Mapper(componentModel = "spring", uses = {ProductMapper.class})
public interface OpportunityMapper extends EntityMapper<OpportunityDTO, Opportunity> {

    @Mapping(source = "product.id", target = "productId")
    OpportunityDTO toDto(Opportunity opportunity);

    @Mapping(target = "customers", ignore = true)
    @Mapping(target = "proposal", ignore = true)
    @Mapping(source = "productId", target = "product")
    Opportunity toEntity(OpportunityDTO opportunityDTO);

    default Opportunity fromId(Long id) {
        if (id == null) {
            return null;
        }
        Opportunity opportunity = new Opportunity();
        opportunity.setId(id);
        return opportunity;
    }
}
