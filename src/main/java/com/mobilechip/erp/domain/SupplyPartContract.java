package com.mobilechip.erp.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A SupplyPartContract.
 */
@Entity
@Table(name = "supply_part_contract")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class SupplyPartContract implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @ManyToOne
    private SupplierContract supplierContract;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public SupplierContract getSupplierContract() {
        return supplierContract;
    }

    public SupplyPartContract supplierContract(SupplierContract supplierContract) {
        this.supplierContract = supplierContract;
        return this;
    }

    public void setSupplierContract(SupplierContract supplierContract) {
        this.supplierContract = supplierContract;
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
        SupplyPartContract supplyPartContract = (SupplyPartContract) o;
        if (supplyPartContract.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), supplyPartContract.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SupplyPartContract{" +
            "id=" + getId() +
            "}";
    }
}
