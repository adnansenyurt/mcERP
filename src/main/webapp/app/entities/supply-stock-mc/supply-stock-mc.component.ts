import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { SupplyStockMc } from './supply-stock-mc.model';
import { SupplyStockMcService } from './supply-stock-mc.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-supply-stock-mc',
    templateUrl: './supply-stock-mc.component.html'
})
export class SupplyStockMcComponent implements OnInit, OnDestroy {
supplyStocks: SupplyStockMc[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private supplyStockService: SupplyStockMcService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.supplyStockService.query().subscribe(
            (res: HttpResponse<SupplyStockMc[]>) => {
                this.supplyStocks = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInSupplyStocks();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: SupplyStockMc) {
        return item.id;
    }
    registerChangeInSupplyStocks() {
        this.eventSubscriber = this.eventManager.subscribe('supplyStockListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
