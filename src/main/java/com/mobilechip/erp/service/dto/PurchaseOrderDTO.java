package com.mobilechip.erp.service.dto;


import java.time.Instant;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import com.mobilechip.erp.domain.enumeration.PurchaseOrderStatus;

/**
 * A DTO for the PurchaseOrder entity.
 */
public class PurchaseOrderDTO implements Serializable {

    private Long id;

    @NotNull
    private String name;

    @NotNull
    private Instant dateOpened;

    @NotNull
    private Long amount;

    private String costCenter;

    private String paymentConditions;

    @NotNull
    private PurchaseOrderStatus currentStatus;

    private Long cashFlowId;

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

    public String getCostCenter() {
        return costCenter;
    }

    public void setCostCenter(String costCenter) {
        this.costCenter = costCenter;
    }

    public String getPaymentConditions() {
        return paymentConditions;
    }

    public void setPaymentConditions(String paymentConditions) {
        this.paymentConditions = paymentConditions;
    }

    public PurchaseOrderStatus getCurrentStatus() {
        return currentStatus;
    }

    public void setCurrentStatus(PurchaseOrderStatus currentStatus) {
        this.currentStatus = currentStatus;
    }

    public Long getCashFlowId() {
        return cashFlowId;
    }

    public void setCashFlowId(Long cashFlowId) {
        this.cashFlowId = cashFlowId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        PurchaseOrderDTO purchaseOrderDTO = (PurchaseOrderDTO) o;
        if(purchaseOrderDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), purchaseOrderDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PurchaseOrderDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", dateOpened='" + getDateOpened() + "'" +
            ", amount=" + getAmount() +
            ", costCenter='" + getCostCenter() + "'" +
            ", paymentConditions='" + getPaymentConditions() + "'" +
            ", currentStatus='" + getCurrentStatus() + "'" +
            "}";
    }
}
