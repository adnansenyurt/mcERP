import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CashFlowMc } from './cash-flow-mc.model';
import { CashFlowMcService } from './cash-flow-mc.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-cash-flow-mc',
    templateUrl: './cash-flow-mc.component.html'
})
export class CashFlowMcComponent implements OnInit, OnDestroy {
cashFlows: CashFlowMc[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private cashFlowService: CashFlowMcService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.cashFlowService.query().subscribe(
            (res: HttpResponse<CashFlowMc[]>) => {
                this.cashFlows = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInCashFlows();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: CashFlowMc) {
        return item.id;
    }
    registerChangeInCashFlows() {
        this.eventSubscriber = this.eventManager.subscribe('cashFlowListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
