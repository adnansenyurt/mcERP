import { BaseEntity } from './../../shared';

export class CustomerMc implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public address?: string,
        public phone?: string,
        public accountNo?: string,
        public contactPersonId?: number,
        public opportunityId?: number,
        public customerOrderId?: number,
        public invoiceId?: number,
        public customerProposalId?: number,
    ) {
    }
}
