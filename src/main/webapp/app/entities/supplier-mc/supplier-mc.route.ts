import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { SupplierMcComponent } from './supplier-mc.component';
import { SupplierMcDetailComponent } from './supplier-mc-detail.component';
import { SupplierMcPopupComponent } from './supplier-mc-dialog.component';
import { SupplierMcDeletePopupComponent } from './supplier-mc-delete-dialog.component';

export const supplierRoute: Routes = [
    {
        path: 'supplier-mc',
        component: SupplierMcComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mcErpApp.supplier.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'supplier-mc/:id',
        component: SupplierMcDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mcErpApp.supplier.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const supplierPopupRoute: Routes = [
    {
        path: 'supplier-mc-new',
        component: SupplierMcPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mcErpApp.supplier.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'supplier-mc/:id/edit',
        component: SupplierMcPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mcErpApp.supplier.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'supplier-mc/:id/delete',
        component: SupplierMcDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mcErpApp.supplier.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
