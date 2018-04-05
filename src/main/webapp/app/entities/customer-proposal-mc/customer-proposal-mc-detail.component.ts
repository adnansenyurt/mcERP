import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { CustomerProposalMc } from './customer-proposal-mc.model';
import { CustomerProposalMcService } from './customer-proposal-mc.service';

@Component({
    selector: 'jhi-customer-proposal-mc-detail',
    templateUrl: './customer-proposal-mc-detail.component.html'
})
export class CustomerProposalMcDetailComponent implements OnInit, OnDestroy {

    customerProposal: CustomerProposalMc;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private customerProposalService: CustomerProposalMcService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCustomerProposals();
    }

    load(id) {
        this.customerProposalService.find(id)
            .subscribe((customerProposalResponse: HttpResponse<CustomerProposalMc>) => {
                this.customerProposal = customerProposalResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCustomerProposals() {
        this.eventSubscriber = this.eventManager.subscribe(
            'customerProposalListModification',
            (response) => this.load(this.customerProposal.id)
        );
    }
}
