import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { McErpSharedModule } from '../../shared';
import {
    PriceRangeMcService,
    PriceRangeMcPopupService,
    PriceRangeMcComponent,
    PriceRangeMcDetailComponent,
    PriceRangeMcDialogComponent,
    PriceRangeMcPopupComponent,
    PriceRangeMcDeletePopupComponent,
    PriceRangeMcDeleteDialogComponent,
    priceRangeRoute,
    priceRangePopupRoute,
} from './';

const ENTITY_STATES = [
    ...priceRangeRoute,
    ...priceRangePopupRoute,
];

@NgModule({
    imports: [
        McErpSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PriceRangeMcComponent,
        PriceRangeMcDetailComponent,
        PriceRangeMcDialogComponent,
        PriceRangeMcDeleteDialogComponent,
        PriceRangeMcPopupComponent,
        PriceRangeMcDeletePopupComponent,
    ],
    entryComponents: [
        PriceRangeMcComponent,
        PriceRangeMcDialogComponent,
        PriceRangeMcPopupComponent,
        PriceRangeMcDeleteDialogComponent,
        PriceRangeMcDeletePopupComponent,
    ],
    providers: [
        PriceRangeMcService,
        PriceRangeMcPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class McErpPriceRangeMcModule {}
