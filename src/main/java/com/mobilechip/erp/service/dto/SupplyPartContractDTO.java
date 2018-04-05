package com.mobilechip.erp.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the SupplyPartContract entity.
 */
public class SupplyPartContractDTO implements Serializable {

    private Long id;

    private Long supplierContractId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getSupplierContractId() {
        return supplierContractId;
    }

    public void setSupplierContractId(Long supplierContractId) {
        this.supplierContractId = supplierContractId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        SupplyPartContractDTO supplyPartContractDTO = (SupplyPartContractDTO) o;
        if(supplyPartContractDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), supplyPartContractDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SupplyPartContractDTO{" +
            "id=" + getId() +
            "}";
    }
}
