import { BaseEntity } from './../../shared';

export const enum PurchaseOrderStatus {
    'ACTIVE',
    'DELIVERED',
    'CANCELLED'
}

export class PurchaseOrderMc implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public dateOpened?: any,
        public amount?: number,
        public costCenter?: string,
        public paymentConditions?: string,
        public currentStatus?: PurchaseOrderStatus,
        public cashFlows?: BaseEntity[],
        public supplierName?: string,
        public supplierId?: number,
        public supplierContractId?: number,
    ) {
    }
}
