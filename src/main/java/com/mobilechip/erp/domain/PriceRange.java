package com.mobilechip.erp.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

import com.mobilechip.erp.domain.enumeration.Currency;

/**
 * A PriceRange.
 */
@Entity
@Table(name = "price_range")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class PriceRange implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "range_low", nullable = false)
    private Integer rangeLow;

    @NotNull
    @Column(name = "range_high", nullable = false)
    private Integer rangeHigh;

    @NotNull
    @Column(name = "price", nullable = false)
    private Long price;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "currency", nullable = false)
    private Currency currency;

    @OneToOne
    @JoinColumn(unique = true)
    private SupplyPartContract contract;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getRangeLow() {
        return rangeLow;
    }

    public PriceRange rangeLow(Integer rangeLow) {
        this.rangeLow = rangeLow;
        return this;
    }

    public void setRangeLow(Integer rangeLow) {
        this.rangeLow = rangeLow;
    }

    public Integer getRangeHigh() {
        return rangeHigh;
    }

    public PriceRange rangeHigh(Integer rangeHigh) {
        this.rangeHigh = rangeHigh;
        return this;
    }

    public void setRangeHigh(Integer rangeHigh) {
        this.rangeHigh = rangeHigh;
    }

    public Long getPrice() {
        return price;
    }

    public PriceRange price(Long price) {
        this.price = price;
        return this;
    }

    public void setPrice(Long price) {
        this.price = price;
    }

    public Currency getCurrency() {
        return currency;
    }

    public PriceRange currency(Currency currency) {
        this.currency = currency;
        return this;
    }

    public void setCurrency(Currency currency) {
        this.currency = currency;
    }

    public SupplyPartContract getContract() {
        return contract;
    }

    public PriceRange contract(SupplyPartContract supplyPartContract) {
        this.contract = supplyPartContract;
        return this;
    }

    public void setContract(SupplyPartContract supplyPartContract) {
        this.contract = supplyPartContract;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        PriceRange priceRange = (PriceRange) o;
        if (priceRange.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), priceRange.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PriceRange{" +
            "id=" + getId() +
            ", rangeLow=" + getRangeLow() +
            ", rangeHigh=" + getRangeHigh() +
            ", price=" + getPrice() +
            ", currency='" + getCurrency() + "'" +
            "}";
    }
}
