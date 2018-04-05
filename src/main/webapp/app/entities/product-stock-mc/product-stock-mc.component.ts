import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ProductStockMc } from './product-stock-mc.model';
import { ProductStockMcService } from './product-stock-mc.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-product-stock-mc',
    templateUrl: './product-stock-mc.component.html'
})
export class ProductStockMcComponent implements OnInit, OnDestroy {
productStocks: ProductStockMc[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private productStockService: ProductStockMcService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.productStockService.query().subscribe(
            (res: HttpResponse<ProductStockMc[]>) => {
                this.productStocks = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInProductStocks();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ProductStockMc) {
        return item.id;
    }
    registerChangeInProductStocks() {
        this.eventSubscriber = this.eventManager.subscribe('productStockListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
