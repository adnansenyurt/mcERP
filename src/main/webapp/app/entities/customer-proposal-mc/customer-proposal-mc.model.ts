import { BaseEntity } from './../../shared';

export class CustomerProposalMc implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public dateSubmitted?: any,
        public duration?: number,
        public amount?: number,
        public opportunityId?: number,
        public customerOrderId?: number,
        public customerId?: number,
    ) {
    }
}
