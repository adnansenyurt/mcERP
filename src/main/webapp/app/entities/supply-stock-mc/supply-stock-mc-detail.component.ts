import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { SupplyStockMc } from './supply-stock-mc.model';
import { SupplyStockMcService } from './supply-stock-mc.service';

@Component({
    selector: 'jhi-supply-stock-mc-detail',
    templateUrl: './supply-stock-mc-detail.component.html'
})
export class SupplyStockMcDetailComponent implements OnInit, OnDestroy {

    supplyStock: SupplyStockMc;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private supplyStockService: SupplyStockMcService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInSupplyStocks();
    }

    load(id) {
        this.supplyStockService.find(id)
            .subscribe((supplyStockResponse: HttpResponse<SupplyStockMc>) => {
                this.supplyStock = supplyStockResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInSupplyStocks() {
        this.eventSubscriber = this.eventManager.subscribe(
            'supplyStockListModification',
            (response) => this.load(this.supplyStock.id)
        );
    }
}
