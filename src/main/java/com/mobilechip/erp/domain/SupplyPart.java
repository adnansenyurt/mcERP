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
 * A SupplyPart.
 */
@Entity
@Table(name = "supply_part")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class SupplyPart implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "supplier_part_code")
    private String supplierPartCode;

    @Column(name = "description")
    private String description;

    @OneToOne
    @JoinColumn(unique = true)
    private SupplyPartContract contract;

    @OneToMany(mappedBy = "supplyPart")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<SupplyStock> supplyStocks = new HashSet<>();

    @ManyToOne
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

    public SupplyPart name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSupplierPartCode() {
        return supplierPartCode;
    }

    public SupplyPart supplierPartCode(String supplierPartCode) {
        this.supplierPartCode = supplierPartCode;
        return this;
    }

    public void setSupplierPartCode(String supplierPartCode) {
        this.supplierPartCode = supplierPartCode;
    }

    public String getDescription() {
        return description;
    }

    public SupplyPart description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public SupplyPartContract getContract() {
        return contract;
    }

    public SupplyPart contract(SupplyPartContract supplyPartContract) {
        this.contract = supplyPartContract;
        return this;
    }

    public void setContract(SupplyPartContract supplyPartContract) {
        this.contract = supplyPartContract;
    }

    public Set<SupplyStock> getSupplyStocks() {
        return supplyStocks;
    }

    public SupplyPart supplyStocks(Set<SupplyStock> supplyStocks) {
        this.supplyStocks = supplyStocks;
        return this;
    }

    public SupplyPart addSupplyStock(SupplyStock supplyStock) {
        this.supplyStocks.add(supplyStock);
        supplyStock.setSupplyPart(this);
        return this;
    }

    public SupplyPart removeSupplyStock(SupplyStock supplyStock) {
        this.supplyStocks.remove(supplyStock);
        supplyStock.setSupplyPart(null);
        return this;
    }

    public void setSupplyStocks(Set<SupplyStock> supplyStocks) {
        this.supplyStocks = supplyStocks;
    }

    public BillOfMaterials getBom() {
        return bom;
    }

    public SupplyPart bom(BillOfMaterials billOfMaterials) {
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
        SupplyPart supplyPart = (SupplyPart) o;
        if (supplyPart.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), supplyPart.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SupplyPart{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", supplierPartCode='" + getSupplierPartCode() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
