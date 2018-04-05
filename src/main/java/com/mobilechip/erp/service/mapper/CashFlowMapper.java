package com.mobilechip.erp.service.mapper;

import com.mobilechip.erp.domain.*;
import com.mobilechip.erp.service.dto.CashFlowDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity CashFlow and its DTO CashFlowDTO.
 */
@Mapper(componentModel = "spring", uses = {CustomerOrderMapper.class, PurchaseOrderMapper.class})
public interface CashFlowMapper extends EntityMapper<CashFlowDTO, CashFlow> {

    @Mapping(source = "customerOrder.id", target = "customerOrderId")
    @Mapping(source = "purchaseOrder.id", target = "purchaseOrderId")
    CashFlowDTO toDto(CashFlow cashFlow);

    @Mapping(source = "customerOrderId", target = "customerOrder")
    @Mapping(source = "purchaseOrderId", target = "purchaseOrder")
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
