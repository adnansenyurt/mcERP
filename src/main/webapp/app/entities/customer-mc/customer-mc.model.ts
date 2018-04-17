import { BaseEntity } from './../../shared';

export class CustomerMc implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public address?: string,
        public phone?: string,
        public accountNo?: string,
        public orders?: BaseEntity[],
        public contactPeople?: BaseEntity[],
        public customerProposals?: BaseEntity[],
        public invoices?: BaseEntity[],
        public opportunityName?: string,
        public opportunityId?: number,
    ) {
    }
}
