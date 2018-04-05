package com.mobilechip.erp.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
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

    @OneToMany(mappedBy = "supplyPartContract")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<SupplierContract> contracts = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Set<SupplierContract> getContracts() {
        return contracts;
    }

    public SupplyPartContract contracts(Set<SupplierContract> supplierContracts) {
        this.contracts = supplierContracts;
        return this;
    }

    public SupplyPartContract addContract(SupplierContract supplierContract) {
        this.contracts.add(supplierContract);
        supplierContract.setSupplyPartContract(this);
        return this;
    }

    public SupplyPartContract removeContract(SupplierContract supplierContract) {
        this.contracts.remove(supplierContract);
        supplierContract.setSupplyPartContract(null);
        return this;
    }

    public void setContracts(Set<SupplierContract> supplierContracts) {
        this.contracts = supplierContracts;
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
