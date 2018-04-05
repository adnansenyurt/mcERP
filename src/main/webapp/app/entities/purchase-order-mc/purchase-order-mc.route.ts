import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PurchaseOrderMcComponent } from './purchase-order-mc.component';
import { PurchaseOrderMcDetailComponent } from './purchase-order-mc-detail.component';
import { PurchaseOrderMcPopupComponent } from './purchase-order-mc-dialog.component';
import { PurchaseOrderMcDeletePopupComponent } from './purchase-order-mc-delete-dialog.component';

export const purchaseOrderRoute: Routes = [
    {
        path: 'purchase-order-mc',
        component: PurchaseOrderMcComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mcErpApp.purchaseOrder.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'purchase-order-mc/:id',
        component: PurchaseOrderMcDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mcErpApp.purchaseOrder.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const purchaseOrderPopupRoute: Routes = [
    {
        path: 'purchase-order-mc-new',
        component: PurchaseOrderMcPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mcErpApp.purchaseOrder.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'purchase-order-mc/:id/edit',
        component: PurchaseOrderMcPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mcErpApp.purchaseOrder.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'purchase-order-mc/:id/delete',
        component: PurchaseOrderMcDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mcErpApp.purchaseOrder.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
