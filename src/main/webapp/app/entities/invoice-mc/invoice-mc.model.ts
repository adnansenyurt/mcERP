import { BaseEntity } from './../../shared';

export const enum InvoiceStatus {
    'ISSUED',
    'CANCELLED',
    'PAID'
}

export class InvoiceMc implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public status?: InvoiceStatus,
        public dateIssued?: any,
        public amountTotal?: number,
        public paymentDue?: number,
        public customerOrderName?: string,
        public customerOrderId?: number,
        public customerName?: string,
        public customerId?: number,
    ) {
    }
}
