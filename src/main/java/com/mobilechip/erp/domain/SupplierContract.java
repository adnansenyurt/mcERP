package com.mobilechip.erp.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
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

    @ManyToOne
    private PurchaseOrder purchaseOrder;

    @ManyToOne
    private SupplyPartContract supplyPartContract;

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

    public PurchaseOrder getPurchaseOrder() {
        return purchaseOrder;
    }

    public SupplierContract purchaseOrder(PurchaseOrder purchaseOrder) {
        this.purchaseOrder = purchaseOrder;
        return this;
    }

    public void setPurchaseOrder(PurchaseOrder purchaseOrder) {
        this.purchaseOrder = purchaseOrder;
    }

    public SupplyPartContract getSupplyPartContract() {
        return supplyPartContract;
    }

    public SupplierContract supplyPartContract(SupplyPartContract supplyPartContract) {
        this.supplyPartContract = supplyPartContract;
        return this;
    }

    public void setSupplyPartContract(SupplyPartContract supplyPartContract) {
        this.supplyPartContract = supplyPartContract;
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
