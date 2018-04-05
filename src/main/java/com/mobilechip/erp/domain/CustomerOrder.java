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

import com.mobilechip.erp.domain.enumeration.CustomerOrderStatus;

/**
 * A CustomerOrder.
 */
@Entity
@Table(name = "customer_order")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class CustomerOrder implements Serializable {

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

    @Column(name = "date_payment_due")
    private Instant datePaymentDue;

    @Column(name = "amount")
    private Long amount;

    @Enumerated(EnumType.STRING)
    @Column(name = "current_status")
    private CustomerOrderStatus currentStatus;

    @ManyToOne
    private Customer customer;

    @OneToOne
    @JoinColumn(unique = true)
    private CustomerProposal proposal;

    @OneToMany(mappedBy = "customerOrder")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<CashFlow> cashFlows = new HashSet<>();

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

    public CustomerOrder name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Instant getDateOpened() {
        return dateOpened;
    }

    public CustomerOrder dateOpened(Instant dateOpened) {
        this.dateOpened = dateOpened;
        return this;
    }

    public void setDateOpened(Instant dateOpened) {
        this.dateOpened = dateOpened;
    }

    public Instant getDatePaymentDue() {
        return datePaymentDue;
    }

    public CustomerOrder datePaymentDue(Instant datePaymentDue) {
        this.datePaymentDue = datePaymentDue;
        return this;
    }

    public void setDatePaymentDue(Instant datePaymentDue) {
        this.datePaymentDue = datePaymentDue;
    }

    public Long getAmount() {
        return amount;
    }

    public CustomerOrder amount(Long amount) {
        this.amount = amount;
        return this;
    }

    public void setAmount(Long amount) {
        this.amount = amount;
    }

    public CustomerOrderStatus getCurrentStatus() {
        return currentStatus;
    }

    public CustomerOrder currentStatus(CustomerOrderStatus currentStatus) {
        this.currentStatus = currentStatus;
        return this;
    }

    public void setCurrentStatus(CustomerOrderStatus currentStatus) {
        this.currentStatus = currentStatus;
    }

    public Customer getCustomer() {
        return customer;
    }

    public CustomerOrder customer(Customer customer) {
        this.customer = customer;
        return this;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public CustomerProposal getProposal() {
        return proposal;
    }

    public CustomerOrder proposal(CustomerProposal customerProposal) {
        this.proposal = customerProposal;
        return this;
    }

    public void setProposal(CustomerProposal customerProposal) {
        this.proposal = customerProposal;
    }

    public Set<CashFlow> getCashFlows() {
        return cashFlows;
    }

    public CustomerOrder cashFlows(Set<CashFlow> cashFlows) {
        this.cashFlows = cashFlows;
        return this;
    }

    public CustomerOrder addCashFlow(CashFlow cashFlow) {
        this.cashFlows.add(cashFlow);
        cashFlow.setCustomerOrder(this);
        return this;
    }

    public CustomerOrder removeCashFlow(CashFlow cashFlow) {
        this.cashFlows.remove(cashFlow);
        cashFlow.setCustomerOrder(null);
        return this;
    }

    public void setCashFlows(Set<CashFlow> cashFlows) {
        this.cashFlows = cashFlows;
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
        CustomerOrder customerOrder = (CustomerOrder) o;
        if (customerOrder.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), customerOrder.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CustomerOrder{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", dateOpened='" + getDateOpened() + "'" +
            ", datePaymentDue='" + getDatePaymentDue() + "'" +
            ", amount=" + getAmount() +
            ", currentStatus='" + getCurrentStatus() + "'" +
            "}";
    }
}
