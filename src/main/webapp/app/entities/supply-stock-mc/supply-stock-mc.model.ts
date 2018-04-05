import { BaseEntity } from './../../shared';

export class SupplyStockMc implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public amount?: number,
        public parts?: BaseEntity[],
    ) {
    }
}
