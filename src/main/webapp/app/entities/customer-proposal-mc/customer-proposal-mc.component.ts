import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CustomerProposalMc } from './customer-proposal-mc.model';
import { CustomerProposalMcService } from './customer-proposal-mc.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-customer-proposal-mc',
    templateUrl: './customer-proposal-mc.component.html'
})
export class CustomerProposalMcComponent implements OnInit, OnDestroy {
customerProposals: CustomerProposalMc[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private customerProposalService: CustomerProposalMcService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.customerProposalService.query().subscribe(
            (res: HttpResponse<CustomerProposalMc[]>) => {
                this.customerProposals = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInCustomerProposals();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: CustomerProposalMc) {
        return item.id;
    }
    registerChangeInCustomerProposals() {
        this.eventSubscriber = this.eventManager.subscribe('customerProposalListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
