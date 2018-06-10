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
        public customers?: BaseEntity[],
        public proposalId?: number,
        public productName?: string,
        public productId?: number,
    ) {
    }
}
