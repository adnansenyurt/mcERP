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

import com.mobilechip.erp.domain.enumeration.CashFlowDirection;

import com.mobilechip.erp.domain.enumeration.CashFlowType;

import com.mobilechip.erp.domain.enumeration.CashFlowStatus;

/**
 * A CashFlow.
 */
@Entity
@Table(name = "cash_flow")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class CashFlow implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "date_payment", nullable = false)
    private Instant datePayment;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "direction", nullable = false)
    private CashFlowDirection direction;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "jhi_type", nullable = false)
    private CashFlowType type;

    @NotNull
    @Column(name = "amount", nullable = false)
    private Long amount;

    @Column(name = "description")
    private String description;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "current_status", nullable = false)
    private CashFlowStatus currentStatus;

    @OneToMany(mappedBy = "cashFlow")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<PurchaseOrder> purchaseOrders = new HashSet<>();

    @OneToMany(mappedBy = "cashFlow")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<CustomerOrder> customerOrders = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getDatePayment() {
        return datePayment;
    }

    public CashFlow datePayment(Instant datePayment) {
        this.datePayment = datePayment;
        return this;
    }

    public void setDatePayment(Instant datePayment) {
        this.datePayment = datePayment;
    }

    public CashFlowDirection getDirection() {
        return direction;
    }

    public CashFlow direction(CashFlowDirection direction) {
        this.direction = direction;
        return this;
    }

    public void setDirection(CashFlowDirection direction) {
        this.direction = direction;
    }

    public CashFlowType getType() {
        return type;
    }

    public CashFlow type(CashFlowType type) {
        this.type = type;
        return this;
    }

    public void setType(CashFlowType type) {
        this.type = type;
    }

    public Long getAmount() {
        return amount;
    }

    public CashFlow amount(Long amount) {
        this.amount = amount;
        return this;
    }

    public void setAmount(Long amount) {
        this.amount = amount;
    }

    public String getDescription() {
        return description;
    }

    public CashFlow description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public CashFlowStatus getCurrentStatus() {
        return currentStatus;
    }

    public CashFlow currentStatus(CashFlowStatus currentStatus) {
        this.currentStatus = currentStatus;
        return this;
    }

    public void setCurrentStatus(CashFlowStatus currentStatus) {
        this.currentStatus = currentStatus;
    }

    public Set<PurchaseOrder> getPurchaseOrders() {
        return purchaseOrders;
    }

    public CashFlow purchaseOrders(Set<PurchaseOrder> purchaseOrders) {
        this.purchaseOrders = purchaseOrders;
        return this;
    }

    public CashFlow addPurchaseOrder(PurchaseOrder purchaseOrder) {
        this.purchaseOrders.add(purchaseOrder);
        purchaseOrder.setCashFlow(this);
        return this;
    }

    public CashFlow removePurchaseOrder(PurchaseOrder purchaseOrder) {
        this.purchaseOrders.remove(purchaseOrder);
        purchaseOrder.setCashFlow(null);
        return this;
    }

    public void setPurchaseOrders(Set<PurchaseOrder> purchaseOrders) {
        this.purchaseOrders = purchaseOrders;
    }

    public Set<CustomerOrder> getCustomerOrders() {
        return customerOrders;
    }

    public CashFlow customerOrders(Set<CustomerOrder> customerOrders) {
        this.customerOrders = customerOrders;
        return this;
    }

    public CashFlow addCustomerOrder(CustomerOrder customerOrder) {
        this.customerOrders.add(customerOrder);
        customerOrder.setCashFlow(this);
        return this;
    }

    public CashFlow removeCustomerOrder(CustomerOrder customerOrder) {
        this.customerOrders.remove(customerOrder);
        customerOrder.setCashFlow(null);
        return this;
    }

    public void setCustomerOrders(Set<CustomerOrder> customerOrders) {
        this.customerOrders = customerOrders;
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
        CashFlow cashFlow = (CashFlow) o;
        if (cashFlow.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), cashFlow.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CashFlow{" +
            "id=" + getId() +
            ", datePayment='" + getDatePayment() + "'" +
            ", direction='" + getDirection() + "'" +
            ", type='" + getType() + "'" +
            ", amount=" + getAmount() +
            ", description='" + getDescription() + "'" +
            ", currentStatus='" + getCurrentStatus() + "'" +
            "}";
    }
}
