package com.mobilechip.erp.service.mapper;

import com.mobilechip.erp.domain.*;
import com.mobilechip.erp.service.dto.CashFlowDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity CashFlow and its DTO CashFlowDTO.
 */
@Mapper(componentModel = "spring", uses = {PurchaseOrderMapper.class, CustomerOrderMapper.class})
public interface CashFlowMapper extends EntityMapper<CashFlowDTO, CashFlow> {

    @Mapping(source = "purchaseOrder.id", target = "purchaseOrderId")
    @Mapping(source = "customerOrder.id", target = "customerOrderId")
    CashFlowDTO toDto(CashFlow cashFlow);

    @Mapping(source = "purchaseOrderId", target = "purchaseOrder")
    @Mapping(source = "customerOrderId", target = "customerOrder")
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
