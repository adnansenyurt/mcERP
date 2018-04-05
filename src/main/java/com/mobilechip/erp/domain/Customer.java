package com.mobilechip.erp.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Customer.
 */
@Entity
@Table(name = "customer")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Customer implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "address")
    private String address;

    @Column(name = "phone")
    private String phone;

    @Column(name = "account_no")
    private String accountNo;

    @OneToMany(mappedBy = "customer")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Opportunity> opportunities = new HashSet<>();

    @OneToMany(mappedBy = "customer")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<CustomerOrder> customerOrders = new HashSet<>();

    @OneToMany(mappedBy = "customer")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<ContactPerson> contactPeople = new HashSet<>();

    @OneToMany(mappedBy = "customer")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<CustomerProposal> customerProposals = new HashSet<>();

    @OneToMany(mappedBy = "customer")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Invoice> invoices = new HashSet<>();

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

    public Customer name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public Customer address(String address) {
        this.address = address;
        return this;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhone() {
        return phone;
    }

    public Customer phone(String phone) {
        this.phone = phone;
        return this;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAccountNo() {
        return accountNo;
    }

    public Customer accountNo(String accountNo) {
        this.accountNo = accountNo;
        return this;
    }

    public void setAccountNo(String accountNo) {
        this.accountNo = accountNo;
    }

    public Set<Opportunity> getOpportunities() {
        return opportunities;
    }

    public Customer opportunities(Set<Opportunity> opportunities) {
        this.opportunities = opportunities;
        return this;
    }

    public Customer addOpportunity(Opportunity opportunity) {
        this.opportunities.add(opportunity);
        opportunity.setCustomer(this);
        return this;
    }

    public Customer removeOpportunity(Opportunity opportunity) {
        this.opportunities.remove(opportunity);
        opportunity.setCustomer(null);
        return this;
    }

    public void setOpportunities(Set<Opportunity> opportunities) {
        this.opportunities = opportunities;
    }

    public Set<CustomerOrder> getCustomerOrders() {
        return customerOrders;
    }

    public Customer customerOrders(Set<CustomerOrder> customerOrders) {
        this.customerOrders = customerOrders;
        return this;
    }

    public Customer addCustomerOrder(CustomerOrder customerOrder) {
        this.customerOrders.add(customerOrder);
        customerOrder.setCustomer(this);
        return this;
    }

    public Customer removeCustomerOrder(CustomerOrder customerOrder) {
        this.customerOrders.remove(customerOrder);
        customerOrder.setCustomer(null);
        return this;
    }

    public void setCustomerOrders(Set<CustomerOrder> customerOrders) {
        this.customerOrders = customerOrders;
    }

    public Set<ContactPerson> getContactPeople() {
        return contactPeople;
    }

    public Customer contactPeople(Set<ContactPerson> contactPeople) {
        this.contactPeople = contactPeople;
        return this;
    }

    public Customer addContactPerson(ContactPerson contactPerson) {
        this.contactPeople.add(contactPerson);
        contactPerson.setCustomer(this);
        return this;
    }

    public Customer removeContactPerson(ContactPerson contactPerson) {
        this.contactPeople.remove(contactPerson);
        contactPerson.setCustomer(null);
        return this;
    }

    public void setContactPeople(Set<ContactPerson> contactPeople) {
        this.contactPeople = contactPeople;
    }

    public Set<CustomerProposal> getCustomerProposals() {
        return customerProposals;
    }

    public Customer customerProposals(Set<CustomerProposal> customerProposals) {
        this.customerProposals = customerProposals;
        return this;
    }

    public Customer addCustomerProposal(CustomerProposal customerProposal) {
        this.customerProposals.add(customerProposal);
        customerProposal.setCustomer(this);
        return this;
    }

    public Customer removeCustomerProposal(CustomerProposal customerProposal) {
        this.customerProposals.remove(customerProposal);
        customerProposal.setCustomer(null);
        return this;
    }

    public void setCustomerProposals(Set<CustomerProposal> customerProposals) {
        this.customerProposals = customerProposals;
    }

    public Set<Invoice> getInvoices() {
        return invoices;
    }

    public Customer invoices(Set<Invoice> invoices) {
        this.invoices = invoices;
        return this;
    }

    public Customer addInvoice(Invoice invoice) {
        this.invoices.add(invoice);
        invoice.setCustomer(this);
        return this;
    }

    public Customer removeInvoice(Invoice invoice) {
        this.invoices.remove(invoice);
        invoice.setCustomer(null);
        return this;
    }

    public void setInvoices(Set<Invoice> invoices) {
        this.invoices = invoices;
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
        Customer customer = (Customer) o;
        if (customer.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), customer.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Customer{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", address='" + getAddress() + "'" +
            ", phone='" + getPhone() + "'" +
            ", accountNo='" + getAccountNo() + "'" +
            "}";
    }
}
