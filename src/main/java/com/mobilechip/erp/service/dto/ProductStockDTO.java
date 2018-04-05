package com.mobilechip.erp.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the ProductStock entity.
 */
public class ProductStockDTO implements Serializable {

    private Long id;

    @NotNull
    private String skuCode;

    private Long amount;

    private Long productId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSkuCode() {
        return skuCode;
    }

    public void setSkuCode(String skuCode) {
        this.skuCode = skuCode;
    }

    public Long getAmount() {
        return amount;
    }

    public void setAmount(Long amount) {
        this.amount = amount;
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

        ProductStockDTO productStockDTO = (ProductStockDTO) o;
        if(productStockDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), productStockDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ProductStockDTO{" +
            "id=" + getId() +
            ", skuCode='" + getSkuCode() + "'" +
            ", amount=" + getAmount() +
            "}";
    }
}
