import { BaseEntity } from './../../shared';

export class ProductStockMc implements BaseEntity {
    constructor(
        public id?: number,
        public skuCode?: string,
        public amount?: number,
        public products?: BaseEntity[],
    ) {
    }
}
