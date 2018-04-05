package com.mobilechip.erp.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
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

    @ManyToOne
    private Opportunity opportunity;

    @ManyToOne
    private ProductStock productStock;

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

    public Opportunity getOpportunity() {
        return opportunity;
    }

    public Product opportunity(Opportunity opportunity) {
        this.opportunity = opportunity;
        return this;
    }

    public void setOpportunity(Opportunity opportunity) {
        this.opportunity = opportunity;
    }

    public ProductStock getProductStock() {
        return productStock;
    }

    public Product productStock(ProductStock productStock) {
        this.productStock = productStock;
        return this;
    }

    public void setProductStock(ProductStock productStock) {
        this.productStock = productStock;
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
