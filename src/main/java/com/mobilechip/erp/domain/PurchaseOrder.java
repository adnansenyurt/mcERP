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

    @ManyToOne
    private Supplier supplier;

    @OneToMany(mappedBy = "purchaseOrder")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<CashFlow> cashFlows = new HashSet<>();

    @ManyToOne
    private SupplierContract supplierContract;

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

    public Supplier getSupplier() {
        return supplier;
    }

    public PurchaseOrder supplier(Supplier supplier) {
        this.supplier = supplier;
        return this;
    }

    public void setSupplier(Supplier supplier) {
        this.supplier = supplier;
    }

    public Set<CashFlow> getCashFlows() {
        return cashFlows;
    }

    public PurchaseOrder cashFlows(Set<CashFlow> cashFlows) {
        this.cashFlows = cashFlows;
        return this;
    }

    public PurchaseOrder addCashFlow(CashFlow cashFlow) {
        this.cashFlows.add(cashFlow);
        cashFlow.setPurchaseOrder(this);
        return this;
    }

    public PurchaseOrder removeCashFlow(CashFlow cashFlow) {
        this.cashFlows.remove(cashFlow);
        cashFlow.setPurchaseOrder(null);
        return this;
    }

    public void setCashFlows(Set<CashFlow> cashFlows) {
        this.cashFlows = cashFlows;
    }

    public SupplierContract getSupplierContract() {
        return supplierContract;
    }

    public PurchaseOrder supplierContract(SupplierContract supplierContract) {
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
