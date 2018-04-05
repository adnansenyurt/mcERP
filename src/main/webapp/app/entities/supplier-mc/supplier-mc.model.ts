import { BaseEntity } from './../../shared';

export class SupplierMc implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public address?: string,
        public domain?: string,
        public web?: string,
        public phone?: string,
        public accountNo?: string,
        public contactPeople?: BaseEntity[],
        public purchaseOrders?: BaseEntity[],
    ) {
    }
}
