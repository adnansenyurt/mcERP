import { BaseEntity } from './../../shared';

export class BillOfMaterialsMc implements BaseEntity {
    constructor(
        public id?: number,
        public items?: number,
        public productId?: number,
        public supplyParts?: BaseEntity[],
    ) {
    }
}
