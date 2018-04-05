package com.mobilechip.erp.service.mapper;

import com.mobilechip.erp.domain.*;
import com.mobilechip.erp.service.dto.CustomerProposalDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity CustomerProposal and its DTO CustomerProposalDTO.
 */
@Mapper(componentModel = "spring", uses = {CustomerMapper.class, OpportunityMapper.class})
public interface CustomerProposalMapper extends EntityMapper<CustomerProposalDTO, CustomerProposal> {

    @Mapping(source = "customer.id", target = "customerId")
    @Mapping(source = "opportunity.id", target = "opportunityId")
    CustomerProposalDTO toDto(CustomerProposal customerProposal);

    @Mapping(source = "customerId", target = "customer")
    @Mapping(source = "opportunityId", target = "opportunity")
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
