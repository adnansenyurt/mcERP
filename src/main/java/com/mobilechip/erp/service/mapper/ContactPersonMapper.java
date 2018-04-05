package com.mobilechip.erp.service.mapper;

import com.mobilechip.erp.domain.*;
import com.mobilechip.erp.service.dto.ContactPersonDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity ContactPerson and its DTO ContactPersonDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ContactPersonMapper extends EntityMapper<ContactPersonDTO, ContactPerson> {


    @Mapping(target = "customers", ignore = true)
    @Mapping(target = "suppliers", ignore = true)
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
