import { BaseEntity } from './../../shared';

export class CustomerMc implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public address?: string,
        public phone?: string,
        public accountNo?: string,
        public opportunities?: BaseEntity[],
        public contactPersonId?: number,
        public customerOrderId?: number,
        public invoiceId?: number,
        public customerProposalId?: number,
    ) {
    }
}
