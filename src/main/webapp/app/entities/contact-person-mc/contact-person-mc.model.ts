import { BaseEntity } from './../../shared';

export class ContactPersonMc implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public role?: string,
        public eMail?: string,
        public mobile?: string,
        public customerName?: string,
        public customerId?: number,
        public supplierName?: string,
        public supplierId?: number,
    ) {
    }
}
