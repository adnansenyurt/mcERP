package com.mobilechip.erp.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the SupplyPart entity.
 */
public class SupplyPartDTO implements Serializable {

    private Long id;

    @NotNull
    private String name;

    private String supplierPartCode;

    private String description;

    private Long contractId;

    private Long supplyStockId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSupplierPartCode() {
        return supplierPartCode;
    }

    public void setSupplierPartCode(String supplierPartCode) {
        this.supplierPartCode = supplierPartCode;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getContractId() {
        return contractId;
    }

    public void setContractId(Long supplyPartContractId) {
        this.contractId = supplyPartContractId;
    }

    public Long getSupplyStockId() {
        return supplyStockId;
    }

    public void setSupplyStockId(Long supplyStockId) {
        this.supplyStockId = supplyStockId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        SupplyPartDTO supplyPartDTO = (SupplyPartDTO) o;
        if(supplyPartDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), supplyPartDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SupplyPartDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", supplierPartCode='" + getSupplierPartCode() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
