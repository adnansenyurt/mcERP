package com.mobilechip.erp.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A BillOfMaterials.
 */
@Entity
@Table(name = "bill_of_materials")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class BillOfMaterials implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "items")
    private Integer items;

    @OneToOne
    @JoinColumn(unique = true)
    private Product product;

    @ManyToOne
    private SupplyPart supplyPart;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getItems() {
        return items;
    }

    public BillOfMaterials items(Integer items) {
        this.items = items;
        return this;
    }

    public void setItems(Integer items) {
        this.items = items;
    }

    public Product getProduct() {
        return product;
    }

    public BillOfMaterials product(Product product) {
        this.product = product;
        return this;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public SupplyPart getSupplyPart() {
        return supplyPart;
    }

    public BillOfMaterials supplyPart(SupplyPart supplyPart) {
        this.supplyPart = supplyPart;
        return this;
    }

    public void setSupplyPart(SupplyPart supplyPart) {
        this.supplyPart = supplyPart;
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
        BillOfMaterials billOfMaterials = (BillOfMaterials) o;
        if (billOfMaterials.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), billOfMaterials.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "BillOfMaterials{" +
            "id=" + getId() +
            ", items=" + getItems() +
            "}";
    }
}
