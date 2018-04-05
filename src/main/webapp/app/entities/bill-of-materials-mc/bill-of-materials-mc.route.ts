import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { BillOfMaterialsMcComponent } from './bill-of-materials-mc.component';
import { BillOfMaterialsMcDetailComponent } from './bill-of-materials-mc-detail.component';
import { BillOfMaterialsMcPopupComponent } from './bill-of-materials-mc-dialog.component';
import { BillOfMaterialsMcDeletePopupComponent } from './bill-of-materials-mc-delete-dialog.component';

export const billOfMaterialsRoute: Routes = [
    {
        path: 'bill-of-materials-mc',
        component: BillOfMaterialsMcComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mcErpApp.billOfMaterials.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'bill-of-materials-mc/:id',
        component: BillOfMaterialsMcDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mcErpApp.billOfMaterials.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const billOfMaterialsPopupRoute: Routes = [
    {
        path: 'bill-of-materials-mc-new',
        component: BillOfMaterialsMcPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mcErpApp.billOfMaterials.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'bill-of-materials-mc/:id/edit',
        component: BillOfMaterialsMcPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mcErpApp.billOfMaterials.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'bill-of-materials-mc/:id/delete',
        component: BillOfMaterialsMcDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mcErpApp.billOfMaterials.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
