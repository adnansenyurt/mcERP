import { BaseEntity } from './../../shared';

export class SupplyPartContractMc implements BaseEntity {
    constructor(
        public id?: number,
        public contracts?: BaseEntity[],
    ) {
    }
}
