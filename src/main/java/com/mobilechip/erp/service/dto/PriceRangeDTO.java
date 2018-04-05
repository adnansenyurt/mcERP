package com.mobilechip.erp.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import com.mobilechip.erp.domain.enumeration.Currency;

/**
 * A DTO for the PriceRange entity.
 */
public class PriceRangeDTO implements Serializable {

    private Long id;

    @NotNull
    private Integer rangeLow;

    @NotNull
    private Integer rangeHigh;

    @NotNull
    private Long price;

    @NotNull
    private Currency currency;

    private Long contractId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getRangeLow() {
        return rangeLow;
    }

    public void setRangeLow(Integer rangeLow) {
        this.rangeLow = rangeLow;
    }

    public Integer getRangeHigh() {
        return rangeHigh;
    }

    public void setRangeHigh(Integer rangeHigh) {
        this.rangeHigh = rangeHigh;
    }

    public Long getPrice() {
        return price;
    }

    public void setPrice(Long price) {
        this.price = price;
    }

    public Currency getCurrency() {
        return currency;
    }

    public void setCurrency(Currency currency) {
        this.currency = currency;
    }

    public Long getContractId() {
        return contractId;
    }

    public void setContractId(Long supplyPartContractId) {
        this.contractId = supplyPartContractId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        PriceRangeDTO priceRangeDTO = (PriceRangeDTO) o;
        if(priceRangeDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), priceRangeDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PriceRangeDTO{" +
            "id=" + getId() +
            ", rangeLow=" + getRangeLow() +
            ", rangeHigh=" + getRangeHigh() +
            ", price=" + getPrice() +
            ", currency='" + getCurrency() + "'" +
            "}";
    }
}
