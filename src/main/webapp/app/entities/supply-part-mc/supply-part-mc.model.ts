import { BaseEntity } from './../../shared';

export class SupplyPartMc implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public supplierPartCode?: string,
        public description?: string,
        public contractId?: number,
        public boms?: BaseEntity[],
        public supplyStockId?: number,
    ) {
    }
}
