import { BaseEntity } from './../../shared';

export const enum CustomerOrderStatus {
    'RECEIVED',
    'INVOICED',
    'PAID'
}

export class CustomerOrderMc implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public dateOpened?: any,
        public datePaymentDue?: any,
        public amount?: number,
        public currentStatus?: CustomerOrderStatus,
        public customerId?: number,
        public proposalId?: number,
        public cashFlows?: BaseEntity[],
    ) {
    }
}
