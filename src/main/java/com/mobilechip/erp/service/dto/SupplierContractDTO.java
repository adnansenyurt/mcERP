package com.mobilechip.erp.service.dto;


import java.time.Instant;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the SupplierContract entity.
 */
public class SupplierContractDTO implements Serializable {

    private Long id;

    @NotNull
    private Instant dateSigned;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getDateSigned() {
        return dateSigned;
    }

    public void setDateSigned(Instant dateSigned) {
        this.dateSigned = dateSigned;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        SupplierContractDTO supplierContractDTO = (SupplierContractDTO) o;
        if(supplierContractDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), supplierContractDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SupplierContractDTO{" +
            "id=" + getId() +
            ", dateSigned='" + getDateSigned() + "'" +
            "}";
    }
}
