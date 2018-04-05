import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { CashFlowMc } from './cash-flow-mc.model';
import { CashFlowMcService } from './cash-flow-mc.service';

@Component({
    selector: 'jhi-cash-flow-mc-detail',
    templateUrl: './cash-flow-mc-detail.component.html'
})
export class CashFlowMcDetailComponent implements OnInit, OnDestroy {

    cashFlow: CashFlowMc;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private cashFlowService: CashFlowMcService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCashFlows();
    }

    load(id) {
        this.cashFlowService.find(id)
            .subscribe((cashFlowResponse: HttpResponse<CashFlowMc>) => {
                this.cashFlow = cashFlowResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCashFlows() {
        this.eventSubscriber = this.eventManager.subscribe(
            'cashFlowListModification',
            (response) => this.load(this.cashFlow.id)
        );
    }
}
