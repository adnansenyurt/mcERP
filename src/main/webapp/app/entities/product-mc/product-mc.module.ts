import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { McErpSharedModule } from '../../shared';
import {
    ProductMcService,
    ProductMcPopupService,
    ProductMcComponent,
    ProductMcDetailComponent,
    ProductMcDialogComponent,
    ProductMcPopupComponent,
    ProductMcDeletePopupComponent,
    ProductMcDeleteDialogComponent,
    productRoute,
    productPopupRoute,
} from './';

const ENTITY_STATES = [
    ...productRoute,
    ...productPopupRoute,
];

@NgModule({
    imports: [
        McErpSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ProductMcComponent,
        ProductMcDetailComponent,
        ProductMcDialogComponent,
        ProductMcDeleteDialogComponent,
        ProductMcPopupComponent,
        ProductMcDeletePopupComponent,
    ],
    entryComponents: [
        ProductMcComponent,
        ProductMcDialogComponent,
        ProductMcPopupComponent,
        ProductMcDeleteDialogComponent,
        ProductMcDeletePopupComponent,
    ],
    providers: [
        ProductMcService,
        ProductMcPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class McErpProductMcModule {}
