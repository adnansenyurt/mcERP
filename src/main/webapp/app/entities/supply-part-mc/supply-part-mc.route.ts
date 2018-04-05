import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { SupplyPartMcComponent } from './supply-part-mc.component';
import { SupplyPartMcDetailComponent } from './supply-part-mc-detail.component';
import { SupplyPartMcPopupComponent } from './supply-part-mc-dialog.component';
import { SupplyPartMcDeletePopupComponent } from './supply-part-mc-delete-dialog.component';

export const supplyPartRoute: Routes = [
    {
        path: 'supply-part-mc',
        component: SupplyPartMcComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mcErpApp.supplyPart.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'supply-part-mc/:id',
        component: SupplyPartMcDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mcErpApp.supplyPart.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const supplyPartPopupRoute: Routes = [
    {
        path: 'supply-part-mc-new',
        component: SupplyPartMcPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mcErpApp.supplyPart.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'supply-part-mc/:id/edit',
        component: SupplyPartMcPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mcErpApp.supplyPart.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'supply-part-mc/:id/delete',
        component: SupplyPartMcDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mcErpApp.supplyPart.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
