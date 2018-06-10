package com.mobilechip.erp.service.mapper;

import com.mobilechip.erp.domain.*;
import com.mobilechip.erp.service.dto.CustomerProposalDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity CustomerProposal and its DTO CustomerProposalDTO.
 */
@Mapper(componentModel = "spring", uses = {OpportunityMapper.class, CustomerMapper.class})
public interface CustomerProposalMapper extends EntityMapper<CustomerProposalDTO, CustomerProposal> {

    @Mapping(source = "opportunity.id", target = "opportunityId")
    @Mapping(source = "opportunity.name", target = "opportunityName")
    @Mapping(source = "customer.id", target = "customerId")
    @Mapping(source = "customer.name", target = "customerName")
    CustomerProposalDTO toDto(CustomerProposal customerProposal);

    @Mapping(source = "opportunityId", target = "opportunity")
    @Mapping(target = "customerOrder", ignore = true)
    @Mapping(source = "customerId", target = "customer")
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
