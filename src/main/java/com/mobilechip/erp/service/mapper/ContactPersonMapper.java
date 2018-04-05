package com.mobilechip.erp.service.mapper;

import com.mobilechip.erp.domain.*;
import com.mobilechip.erp.service.dto.ContactPersonDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity ContactPerson and its DTO ContactPersonDTO.
 */
@Mapper(componentModel = "spring", uses = {CustomerMapper.class, SupplierMapper.class})
public interface ContactPersonMapper extends EntityMapper<ContactPersonDTO, ContactPerson> {

    @Mapping(source = "customer.id", target = "customerId")
    @Mapping(source = "supplier.id", target = "supplierId")
    ContactPersonDTO toDto(ContactPerson contactPerson);

    @Mapping(source = "customerId", target = "customer")
    @Mapping(source = "supplierId", target = "supplier")
    ContactPerson toEntity(ContactPersonDTO contactPersonDTO);

    default ContactPerson fromId(Long id) {
        if (id == null) {
            return null;
        }
        ContactPerson contactPerson = new ContactPerson();
        contactPerson.setId(id);
        return contactPerson;
    }
}
