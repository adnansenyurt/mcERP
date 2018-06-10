import { BaseEntity } from './../../shared';

export const enum CashFlowDirection {
    'IN',
    'OUT'
}

export const enum CashFlowType {
    'INVOICE',
    'ALLOWANCE',
    'SALARY',
    'PO',
    'TAX',
    'CORRECTION'
}

export const enum CashFlowStatus {
    'DUE',
    'PAID',
    'LATE',
    'CANCELLED'
}

export class CashFlowMc implements BaseEntity {
    constructor(
        public id?: number,
        public datePayment?: any,
        public direction?: CashFlowDirection,
        public type?: CashFlowType,
        public amount?: number,
        public description?: string,
        public currentStatus?: CashFlowStatus,
        public purchaseOrderName?: string,
        public purchaseOrderId?: number,
        public customerOrderName?: string,
        public customerOrderId?: number,
    ) {
    }
}
