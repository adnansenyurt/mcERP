import { BaseEntity } from './../../shared';

export const enum Currency {
    'TL',
    'USD',
    'EURO'
}

export class PriceRangeMc implements BaseEntity {
    constructor(
        public id?: number,
        public rangeLow?: number,
        public rangeHigh?: number,
        public price?: number,
        public currency?: Currency,
        public contractId?: number,
    ) {
    }
}
