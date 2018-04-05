package com.mobilechip.erp.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the BillOfMaterials entity.
 */
public class BillOfMaterialsDTO implements Serializable {

    private Long id;

    private Integer items;

    private Long productId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getItems() {
        return items;
    }

    public void setItems(Integer items) {
        this.items = items;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        BillOfMaterialsDTO billOfMaterialsDTO = (BillOfMaterialsDTO) o;
        if(billOfMaterialsDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), billOfMaterialsDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "BillOfMaterialsDTO{" +
            "id=" + getId() +
            ", items=" + getItems() +
            "}";
    }
}
