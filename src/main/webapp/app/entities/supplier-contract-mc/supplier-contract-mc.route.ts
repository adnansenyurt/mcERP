import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { SupplierContractMcComponent } from './supplier-contract-mc.component';
import { SupplierContractMcDetailComponent } from './supplier-contract-mc-detail.component';
import { SupplierContractMcPopupComponent } from './supplier-contract-mc-dialog.component';
import { SupplierContractMcDeletePopupComponent } from './supplier-contract-mc-delete-dialog.component';

export const supplierContractRoute: Routes = [
    {
        path: 'supplier-contract-mc',
        component: SupplierContractMcComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mcErpApp.supplierContract.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'supplier-contract-mc/:id',
        component: SupplierContractMcDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mcErpApp.supplierContract.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const supplierContractPopupRoute: Routes = [
    {
        path: 'supplier-contract-mc-new',
        component: SupplierContractMcPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mcErpApp.supplierContract.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'supplier-contract-mc/:id/edit',
        component: SupplierContractMcPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mcErpApp.supplierContract.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'supplier-contract-mc/:id/delete',
        component: SupplierContractMcDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mcErpApp.supplierContract.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
