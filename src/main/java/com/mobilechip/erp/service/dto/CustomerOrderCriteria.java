package com.mobilechip.erp.service.dto;

import java.io.Serializable;
import com.mobilechip.erp.domain.enumeration.CustomerOrderStatus;
import io.github.jhipster.service.filter.BooleanFilter;
import io.github.jhipster.service.filter.DoubleFilter;
import io.github.jhipster.service.filter.Filter;
import io.github.jhipster.service.filter.FloatFilter;
import io.github.jhipster.service.filter.IntegerFilter;
import io.github.jhipster.service.filter.LongFilter;
import io.github.jhipster.service.filter.StringFilter;

import io.github.jhipster.service.filter.InstantFilter;




/**
 * Criteria class for the CustomerOrder entity. This class is used in CustomerOrderResource to
 * receive all the possible filtering options from the Http GET request parameters.
 * For example the following could be a valid requests:
 * <code> /customer-orders?id.greaterThan=5&amp;attr1.contains=something&amp;attr2.specified=false</code>
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class CustomerOrderCriteria implements Serializable {
    /**
     * Class for filtering CustomerOrderStatus
     */
    public static class CustomerOrderStatusFilter extends Filter<CustomerOrderStatus> {
    }

    private static final long serialVersionUID = 1L;


    private LongFilter id;

    private StringFilter name;

    private InstantFilter dateOpened;

    private InstantFilter datePaymentDue;

    private LongFilter amount;

    private CustomerOrderStatusFilter currentStatus;

    private LongFilter proposalId;

    private LongFilter cashFlowId;

    private LongFilter invoiceId;

    private LongFilter customerId;

    public CustomerOrderCriteria() {
    }

    public LongFilter getId() {
        return id;
    }

    public void setId(LongFilter id) {
        this.id = id;
    }

    public StringFilter getName() {
        return name;
    }

    public void setName(StringFilter name) {
        this.name = name;
    }

    public InstantFilter getDateOpened() {
        return dateOpened;
    }

    public void setDateOpened(InstantFilter dateOpened) {
        this.dateOpened = dateOpened;
    }

    public InstantFilter getDatePaymentDue() {
        return datePaymentDue;
    }

    public void setDatePaymentDue(InstantFilter datePaymentDue) {
        this.datePaymentDue = datePaymentDue;
    }

    public LongFilter getAmount() {
        return amount;
    }

    public void setAmount(LongFilter amount) {
        this.amount = amount;
    }

    public CustomerOrderStatusFilter getCurrentStatus() {
        return currentStatus;
    }

    public void setCurrentStatus(CustomerOrderStatusFilter currentStatus) {
        this.currentStatus = currentStatus;
    }

    public LongFilter getProposalId() {
        return proposalId;
    }

    public void setProposalId(LongFilter proposalId) {
        this.proposalId = proposalId;
    }

    public LongFilter getCashFlowId() {
        return cashFlowId;
    }

    public void setCashFlowId(LongFilter cashFlowId) {
        this.cashFlowId = cashFlowId;
    }

    public LongFilter getInvoiceId() {
        return invoiceId;
    }

    public void setInvoiceId(LongFilter invoiceId) {
        this.invoiceId = invoiceId;
    }

    public LongFilter getCustomerId() {
        return customerId;
    }

    public void setCustomerId(LongFilter customerId) {
        this.customerId = customerId;
    }

    @Override
    public String toString() {
        return "CustomerOrderCriteria{" +
                (id != null ? "id=" + id + ", " : "") +
                (name != null ? "name=" + name + ", " : "") +
                (dateOpened != null ? "dateOpened=" + dateOpened + ", " : "") +
                (datePaymentDue != null ? "datePaymentDue=" + datePaymentDue + ", " : "") +
                (amount != null ? "amount=" + amount + ", " : "") +
                (currentStatus != null ? "currentStatus=" + currentStatus + ", " : "") +
                (proposalId != null ? "proposalId=" + proposalId + ", " : "") +
                (cashFlowId != null ? "cashFlowId=" + cashFlowId + ", " : "") +
                (invoiceId != null ? "invoiceId=" + invoiceId + ", " : "") +
                (customerId != null ? "customerId=" + customerId + ", " : "") +
            "}";
    }

}
