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

import com.mobilechip.erp.domain.enumeration.PurchaseOrderStatus;

/**
 * A PurchaseOrder.
 */
@Entity
@Table(name = "purchase_order")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class PurchaseOrder implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @Column(name = "date_opened", nullable = false)
    private Instant dateOpened;

    @NotNull
    @Column(name = "amount", nullable = false)
    private Long amount;

    @Column(name = "cost_center")
    private String costCenter;

    @Column(name = "payment_conditions")
    private String paymentConditions;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "current_status", nullable = false)
    private PurchaseOrderStatus currentStatus;

    @OneToMany(mappedBy = "purchaseOrder")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Supplier> suppliers = new HashSet<>();

    @OneToMany(mappedBy = "purchaseOrder")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<SupplierContract> contracts = new HashSet<>();

    @ManyToOne
    private CashFlow cashFlow;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public PurchaseOrder name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Instant getDateOpened() {
        return dateOpened;
    }

    public PurchaseOrder dateOpened(Instant dateOpened) {
        this.dateOpened = dateOpened;
        return this;
    }

    public void setDateOpened(Instant dateOpened) {
        this.dateOpened = dateOpened;
    }

    public Long getAmount() {
        return amount;
    }

    public PurchaseOrder amount(Long amount) {
        this.amount = amount;
        return this;
    }

    public void setAmount(Long amount) {
        this.amount = amount;
    }

    public String getCostCenter() {
        return costCenter;
    }

    public PurchaseOrder costCenter(String costCenter) {
        this.costCenter = costCenter;
        return this;
    }

    public void setCostCenter(String costCenter) {
        this.costCenter = costCenter;
    }

    public String getPaymentConditions() {
        return paymentConditions;
    }

    public PurchaseOrder paymentConditions(String paymentConditions) {
        this.paymentConditions = paymentConditions;
        return this;
    }

    public void setPaymentConditions(String paymentConditions) {
        this.paymentConditions = paymentConditions;
    }

    public PurchaseOrderStatus getCurrentStatus() {
        return currentStatus;
    }

    public PurchaseOrder currentStatus(PurchaseOrderStatus currentStatus) {
        this.currentStatus = currentStatus;
        return this;
    }

    public void setCurrentStatus(PurchaseOrderStatus currentStatus) {
        this.currentStatus = currentStatus;
    }

    public Set<Supplier> getSuppliers() {
        return suppliers;
    }

    public PurchaseOrder suppliers(Set<Supplier> suppliers) {
        this.suppliers = suppliers;
        return this;
    }

    public PurchaseOrder addSupplier(Supplier supplier) {
        this.suppliers.add(supplier);
        supplier.setPurchaseOrder(this);
        return this;
    }

    public PurchaseOrder removeSupplier(Supplier supplier) {
        this.suppliers.remove(supplier);
        supplier.setPurchaseOrder(null);
        return this;
    }

    public void setSuppliers(Set<Supplier> suppliers) {
        this.suppliers = suppliers;
    }

    public Set<SupplierContract> getContracts() {
        return contracts;
    }

    public PurchaseOrder contracts(Set<SupplierContract> supplierContracts) {
        this.contracts = supplierContracts;
        return this;
    }

    public PurchaseOrder addContract(SupplierContract supplierContract) {
        this.contracts.add(supplierContract);
        supplierContract.setPurchaseOrder(this);
        return this;
    }

    public PurchaseOrder removeContract(SupplierContract supplierContract) {
        this.contracts.remove(supplierContract);
        supplierContract.setPurchaseOrder(null);
        return this;
    }

    public void setContracts(Set<SupplierContract> supplierContracts) {
        this.contracts = supplierContracts;
    }

    public CashFlow getCashFlow() {
        return cashFlow;
    }

    public PurchaseOrder cashFlow(CashFlow cashFlow) {
        this.cashFlow = cashFlow;
        return this;
    }

    public void setCashFlow(CashFlow cashFlow) {
        this.cashFlow = cashFlow;
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
        PurchaseOrder purchaseOrder = (PurchaseOrder) o;
        if (purchaseOrder.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), purchaseOrder.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PurchaseOrder{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", dateOpened='" + getDateOpened() + "'" +
            ", amount=" + getAmount() +
            ", costCenter='" + getCostCenter() + "'" +
            ", paymentConditions='" + getPaymentConditions() + "'" +
            ", currentStatus='" + getCurrentStatus() + "'" +
            "}";
    }
}
