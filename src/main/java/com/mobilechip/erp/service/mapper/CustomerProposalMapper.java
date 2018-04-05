package com.mobilechip.erp.service.mapper;

import com.mobilechip.erp.domain.*;
import com.mobilechip.erp.service.dto.CustomerProposalDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity CustomerProposal and its DTO CustomerProposalDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface CustomerProposalMapper extends EntityMapper<CustomerProposalDTO, CustomerProposal> {


    @Mapping(target = "customers", ignore = true)
    CustomerProposal toEntity(CustomerProposalDTO customerProposalDTO);

    default CustomerProposal fromId(Long id) {
        if (id == null) {
            return null;
        }
        CustomerProposal customerProposal = new CustomerProposal();
        customerProposal.setId(id);
        return customerProposal;
    }
}
