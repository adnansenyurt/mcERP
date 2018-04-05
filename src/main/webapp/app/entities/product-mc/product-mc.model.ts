import { BaseEntity } from './../../shared';

export class ProductMc implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public model?: string,
        public image?: string,
        public brochure?: string,
        public specsURL?: string,
        public opportunityId?: number,
        public productStockId?: number,
    ) {
    }
}
