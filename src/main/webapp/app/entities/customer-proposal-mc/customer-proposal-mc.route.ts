import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { CustomerProposalMcComponent } from './customer-proposal-mc.component';
import { CustomerProposalMcDetailComponent } from './customer-proposal-mc-detail.component';
import { CustomerProposalMcPopupComponent } from './customer-proposal-mc-dialog.component';
import { CustomerProposalMcDeletePopupComponent } from './customer-proposal-mc-delete-dialog.component';

export const customerProposalRoute: Routes = [
    {
        path: 'customer-proposal-mc',
        component: CustomerProposalMcComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mcErpApp.customerProposal.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'customer-proposal-mc/:id',
        component: CustomerProposalMcDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mcErpApp.customerProposal.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const customerProposalPopupRoute: Routes = [
    {
        path: 'customer-proposal-mc-new',
        component: CustomerProposalMcPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mcErpApp.customerProposal.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'customer-proposal-mc/:id/edit',
        component: CustomerProposalMcPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mcErpApp.customerProposal.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'customer-proposal-mc/:id/delete',
        component: CustomerProposalMcDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mcErpApp.customerProposal.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
