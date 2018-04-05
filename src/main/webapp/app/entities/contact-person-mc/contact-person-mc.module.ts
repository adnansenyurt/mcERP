import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { McErpSharedModule } from '../../shared';
import {
    ContactPersonMcService,
    ContactPersonMcPopupService,
    ContactPersonMcComponent,
    ContactPersonMcDetailComponent,
    ContactPersonMcDialogComponent,
    ContactPersonMcPopupComponent,
    ContactPersonMcDeletePopupComponent,
    ContactPersonMcDeleteDialogComponent,
    contactPersonRoute,
    contactPersonPopupRoute,
} from './';

const ENTITY_STATES = [
    ...contactPersonRoute,
    ...contactPersonPopupRoute,
];

@NgModule({
    imports: [
        McErpSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ContactPersonMcComponent,
        ContactPersonMcDetailComponent,
        ContactPersonMcDialogComponent,
        ContactPersonMcDeleteDialogComponent,
        ContactPersonMcPopupComponent,
        ContactPersonMcDeletePopupComponent,
    ],
    entryComponents: [
        ContactPersonMcComponent,
        ContactPersonMcDialogComponent,
        ContactPersonMcPopupComponent,
        ContactPersonMcDeleteDialogComponent,
        ContactPersonMcDeletePopupComponent,
    ],
    providers: [
        ContactPersonMcService,
        ContactPersonMcPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class McErpContactPersonMcModule {}
