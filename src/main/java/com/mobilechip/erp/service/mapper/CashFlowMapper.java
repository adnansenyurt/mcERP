package com.mobilechip.erp.service.mapper;

import com.mobilechip.erp.domain.*;
import com.mobilechip.erp.service.dto.CashFlowDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity CashFlow and its DTO CashFlowDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface CashFlowMapper extends EntityMapper<CashFlowDTO, CashFlow> {


    @Mapping(target = "purchaseOrders", ignore = true)
    @Mapping(target = "customerOrders", ignore = true)
    CashFlow toEntity(CashFlowDTO cashFlowDTO);

    default CashFlow fromId(Long id) {
        if (id == null) {
            return null;
        }
        CashFlow cashFlow = new CashFlow();
        cashFlow.setId(id);
        return cashFlow;
    }
}
