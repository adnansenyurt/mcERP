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
 * A CustomerProposal.
 */
@Entity
@Table(name = "customer_proposal")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class CustomerProposal implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @Column(name = "date_submitted", nullable = false)
    private Instant dateSubmitted;

    @Column(name = "duration")
    private Integer duration;

    @Column(name = "amount")
    private Long amount;

    @OneToMany(mappedBy = "customerProposal")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Customer> customers = new HashSet<>();

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

    public CustomerProposal name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Instant getDateSubmitted() {
        return dateSubmitted;
    }

    public CustomerProposal dateSubmitted(Instant dateSubmitted) {
        this.dateSubmitted = dateSubmitted;
        return this;
    }

    public void setDateSubmitted(Instant dateSubmitted) {
        this.dateSubmitted = dateSubmitted;
    }

    public Integer getDuration() {
        return duration;
    }

    public CustomerProposal duration(Integer duration) {
        this.duration = duration;
        return this;
    }

    public void setDuration(Integer duration) {
        this.duration = duration;
    }

    public Long getAmount() {
        return amount;
    }

    public CustomerProposal amount(Long amount) {
        this.amount = amount;
        return this;
    }

    public void setAmount(Long amount) {
        this.amount = amount;
    }

    public Set<Customer> getCustomers() {
        return customers;
    }

    public CustomerProposal customers(Set<Customer> customers) {
        this.customers = customers;
        return this;
    }

    public CustomerProposal addCustomer(Customer customer) {
        this.customers.add(customer);
        customer.setCustomerProposal(this);
        return this;
    }

    public CustomerProposal removeCustomer(Customer customer) {
        this.customers.remove(customer);
        customer.setCustomerProposal(null);
        return this;
    }

    public void setCustomers(Set<Customer> customers) {
        this.customers = customers;
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
        CustomerProposal customerProposal = (CustomerProposal) o;
        if (customerProposal.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), customerProposal.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CustomerProposal{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", dateSubmitted='" + getDateSubmitted() + "'" +
            ", duration=" + getDuration() +
            ", amount=" + getAmount() +
            "}";
    }
}
