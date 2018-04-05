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
 * A ContactPerson.
 */
@Entity
@Table(name = "contact_person")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ContactPerson implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "jhi_role")
    private String role;

    @Column(name = "e_mail")
    private String eMail;

    @Column(name = "mobile")
    private String mobile;

    @OneToMany(mappedBy = "contactPerson")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Customer> customers = new HashSet<>();

    @OneToMany(mappedBy = "contactPerson")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Supplier> suppliers = new HashSet<>();

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

    public ContactPerson name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getRole() {
        return role;
    }

    public ContactPerson role(String role) {
        this.role = role;
        return this;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String geteMail() {
        return eMail;
    }

    public ContactPerson eMail(String eMail) {
        this.eMail = eMail;
        return this;
    }

    public void seteMail(String eMail) {
        this.eMail = eMail;
    }

    public String getMobile() {
        return mobile;
    }

    public ContactPerson mobile(String mobile) {
        this.mobile = mobile;
        return this;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public Set<Customer> getCustomers() {
        return customers;
    }

    public ContactPerson customers(Set<Customer> customers) {
        this.customers = customers;
        return this;
    }

    public ContactPerson addCustomer(Customer customer) {
        this.customers.add(customer);
        customer.setContactPerson(this);
        return this;
    }

    public ContactPerson removeCustomer(Customer customer) {
        this.customers.remove(customer);
        customer.setContactPerson(null);
        return this;
    }

    public void setCustomers(Set<Customer> customers) {
        this.customers = customers;
    }

    public Set<Supplier> getSuppliers() {
        return suppliers;
    }

    public ContactPerson suppliers(Set<Supplier> suppliers) {
        this.suppliers = suppliers;
        return this;
    }

    public ContactPerson addSupplier(Supplier supplier) {
        this.suppliers.add(supplier);
        supplier.setContactPerson(this);
        return this;
    }

    public ContactPerson removeSupplier(Supplier supplier) {
        this.suppliers.remove(supplier);
        supplier.setContactPerson(null);
        return this;
    }

    public void setSuppliers(Set<Supplier> suppliers) {
        this.suppliers = suppliers;
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
        ContactPerson contactPerson = (ContactPerson) o;
        if (contactPerson.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), contactPerson.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ContactPerson{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", role='" + getRole() + "'" +
            ", eMail='" + geteMail() + "'" +
            ", mobile='" + getMobile() + "'" +
            "}";
    }
}
