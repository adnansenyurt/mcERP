import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { CashFlowMcComponent } from './cash-flow-mc.component';
import { CashFlowMcDetailComponent } from './cash-flow-mc-detail.component';
import { CashFlowMcPopupComponent } from './cash-flow-mc-dialog.component';
import { CashFlowMcDeletePopupComponent } from './cash-flow-mc-delete-dialog.component';

export const cashFlowRoute: Routes = [
    {
        path: 'cash-flow-mc',
        component: CashFlowMcComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mcErpApp.cashFlow.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'cash-flow-mc/:id',
        component: CashFlowMcDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mcErpApp.cashFlow.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const cashFlowPopupRoute: Routes = [
    {
        path: 'cash-flow-mc-new',
        component: CashFlowMcPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mcErpApp.cashFlow.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cash-flow-mc/:id/edit',
        component: CashFlowMcPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mcErpApp.cashFlow.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cash-flow-mc/:id/delete',
        component: CashFlowMcDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mcErpApp.cashFlow.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
