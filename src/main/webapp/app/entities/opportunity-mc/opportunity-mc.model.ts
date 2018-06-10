import { BaseEntity } from './../../shared';

export const enum OpportunityStatus {
    'INITIAL',
    'PROPOSAL',
    'LOST',
    'WON'
}

export class OpportunityMc implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public dateOpened?: any,
        public amount?: number,
        public currentStatus?: OpportunityStatus,
        public proposalId?: number,
        public customerName?: string,
        public customerId?: number,
        public productName?: string,
        public productId?: number,
    ) {
    }
}
