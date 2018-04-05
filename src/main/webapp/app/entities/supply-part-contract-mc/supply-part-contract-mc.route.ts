import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { SupplyPartContractMcComponent } from './supply-part-contract-mc.component';
import { SupplyPartContractMcDetailComponent } from './supply-part-contract-mc-detail.component';
import { SupplyPartContractMcPopupComponent } from './supply-part-contract-mc-dialog.component';
import { SupplyPartContractMcDeletePopupComponent } from './supply-part-contract-mc-delete-dialog.component';

export const supplyPartContractRoute: Routes = [
    {
        path: 'supply-part-contract-mc',
        component: SupplyPartContractMcComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mcErpApp.supplyPartContract.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'supply-part-contract-mc/:id',
        component: SupplyPartContractMcDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mcErpApp.supplyPartContract.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const supplyPartContractPopupRoute: Routes = [
    {
        path: 'supply-part-contract-mc-new',
        component: SupplyPartContractMcPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mcErpApp.supplyPartContract.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'supply-part-contract-mc/:id/edit',
        component: SupplyPartContractMcPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mcErpApp.supplyPartContract.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'supply-part-contract-mc/:id/delete',
        component: SupplyPartContractMcDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mcErpApp.supplyPartContract.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
