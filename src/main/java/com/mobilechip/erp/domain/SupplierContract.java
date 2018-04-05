package com.mobilechip.erp.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A SupplierContract.
 */
@Entity
@Table(name = "supplier_contract")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class SupplierContract implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "date_signed", nullable = false)
    private Instant dateSigned;

    @OneToMany(mappedBy = "supplierContract")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<PurchaseOrder> purchaseOrders = new HashSet<>();

    @OneToMany(mappedBy = "supplierContract")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<SupplyPartContract> supplyPartContracts = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getDateSigned() {
        return dateSigned;
    }

    public SupplierContract dateSigned(Instant dateSigned) {
        this.dateSigned = dateSigned;
        return this;
    }

    public void setDateSigned(Instant dateSigned) {
        this.dateSigned = dateSigned;
    }

    public Set<PurchaseOrder> getPurchaseOrders() {
        return purchaseOrders;
    }

    public SupplierContract purchaseOrders(Set<PurchaseOrder> purchaseOrders) {
        this.purchaseOrders = purchaseOrders;
        return this;
    }

    public SupplierContract addPurchaseOrder(PurchaseOrder purchaseOrder) {
        this.purchaseOrders.add(purchaseOrder);
        purchaseOrder.setSupplierContract(this);
        return this;
    }

    public SupplierContract removePurchaseOrder(PurchaseOrder purchaseOrder) {
        this.purchaseOrders.remove(purchaseOrder);
        purchaseOrder.setSupplierContract(null);
        return this;
    }

    public void setPurchaseOrders(Set<PurchaseOrder> purchaseOrders) {
        this.purchaseOrders = purchaseOrders;
    }

    public Set<SupplyPartContract> getSupplyPartContracts() {
        return supplyPartContracts;
    }

    public SupplierContract supplyPartContracts(Set<SupplyPartContract> supplyPartContracts) {
        this.supplyPartContracts = supplyPartContracts;
        return this;
    }

    public SupplierContract addSupplyPartContract(SupplyPartContract supplyPartContract) {
        this.supplyPartContracts.add(supplyPartContract);
        supplyPartContract.setSupplierContract(this);
        return this;
    }

    public SupplierContract removeSupplyPartContract(SupplyPartContract supplyPartContract) {
        this.supplyPartContracts.remove(supplyPartContract);
        supplyPartContract.setSupplierContract(null);
        return this;
    }

    public void setSupplyPartContracts(Set<SupplyPartContract> supplyPartContracts) {
        this.supplyPartContracts = supplyPartContracts;
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
        SupplierContract supplierContract = (SupplierContract) o;
        if (supplierContract.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), supplierContract.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SupplierContract{" +
            "id=" + getId() +
            ", dateSigned='" + getDateSigned() + "'" +
            "}";
    }
}
