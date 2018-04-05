package com.mobilechip.erp.service.dto;


import java.time.Instant;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import com.mobilechip.erp.domain.enumeration.OpportunityStatus;

/**
 * A DTO for the Opportunity entity.
 */
public class OpportunityDTO implements Serializable {

    private Long id;

    @NotNull
    private String name;

    @NotNull
    private Instant dateOpened;

    private Long amount;

    private OpportunityStatus currentStatus;

    private Long customerId;

    private Long productId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Instant getDateOpened() {
        return dateOpened;
    }

    public void setDateOpened(Instant dateOpened) {
        this.dateOpened = dateOpened;
    }

    public Long getAmount() {
        return amount;
    }

    public void setAmount(Long amount) {
        this.amount = amount;
    }

    public OpportunityStatus getCurrentStatus() {
        return currentStatus;
    }

    public void setCurrentStatus(OpportunityStatus currentStatus) {
        this.currentStatus = currentStatus;
    }

    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        OpportunityDTO opportunityDTO = (OpportunityDTO) o;
        if(opportunityDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), opportunityDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "OpportunityDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", dateOpened='" + getDateOpened() + "'" +
            ", amount=" + getAmount() +
            ", currentStatus='" + getCurrentStatus() + "'" +
            "}";
    }
}
