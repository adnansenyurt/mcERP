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
 * A Product.
 */
@Entity
@Table(name = "product")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Product implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @Column(name = "model", nullable = false)
    private String model;

    @Column(name = "image")
    private String image;

    @Column(name = "brochure")
    private String brochure;

    @Column(name = "specs_url")
    private String specsURL;

    @OneToMany(mappedBy = "product")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Opportunity> opportunities = new HashSet<>();

    @OneToMany(mappedBy = "product")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<ProductStock> productStocks = new HashSet<>();

    @OneToOne(mappedBy = "product")
    @JsonIgnore
    private BillOfMaterials bom;

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

    public Product name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getModel() {
        return model;
    }

    public Product model(String model) {
        this.model = model;
        return this;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getImage() {
        return image;
    }

    public Product image(String image) {
        this.image = image;
        return this;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getBrochure() {
        return brochure;
    }

    public Product brochure(String brochure) {
        this.brochure = brochure;
        return this;
    }

    public void setBrochure(String brochure) {
        this.brochure = brochure;
    }

    public String getSpecsURL() {
        return specsURL;
    }

    public Product specsURL(String specsURL) {
        this.specsURL = specsURL;
        return this;
    }

    public void setSpecsURL(String specsURL) {
        this.specsURL = specsURL;
    }

    public Set<Opportunity> getOpportunities() {
        return opportunities;
    }

    public Product opportunities(Set<Opportunity> opportunities) {
        this.opportunities = opportunities;
        return this;
    }

    public Product addOpportunity(Opportunity opportunity) {
        this.opportunities.add(opportunity);
        opportunity.setProduct(this);
        return this;
    }

    public Product removeOpportunity(Opportunity opportunity) {
        this.opportunities.remove(opportunity);
        opportunity.setProduct(null);
        return this;
    }

    public void setOpportunities(Set<Opportunity> opportunities) {
        this.opportunities = opportunities;
    }

    public Set<ProductStock> getProductStocks() {
        return productStocks;
    }

    public Product productStocks(Set<ProductStock> productStocks) {
        this.productStocks = productStocks;
        return this;
    }

    public Product addProductStock(ProductStock productStock) {
        this.productStocks.add(productStock);
        productStock.setProduct(this);
        return this;
    }

    public Product removeProductStock(ProductStock productStock) {
        this.productStocks.remove(productStock);
        productStock.setProduct(null);
        return this;
    }

    public void setProductStocks(Set<ProductStock> productStocks) {
        this.productStocks = productStocks;
    }

    public BillOfMaterials getBom() {
        return bom;
    }

    public Product bom(BillOfMaterials billOfMaterials) {
        this.bom = billOfMaterials;
        return this;
    }

    public void setBom(BillOfMaterials billOfMaterials) {
        this.bom = billOfMaterials;
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
        Product product = (Product) o;
        if (product.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), product.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Product{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", model='" + getModel() + "'" +
            ", image='" + getImage() + "'" +
            ", brochure='" + getBrochure() + "'" +
            ", specsURL='" + getSpecsURL() + "'" +
            "}";
    }
}
