import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ProductStockMc } from './product-stock-mc.model';
import { ProductStockMcService } from './product-stock-mc.service';

@Component({
    selector: 'jhi-product-stock-mc-detail',
    templateUrl: './product-stock-mc-detail.component.html'
})
export class ProductStockMcDetailComponent implements OnInit, OnDestroy {

    productStock: ProductStockMc;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private productStockService: ProductStockMcService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInProductStocks();
    }

    load(id) {
        this.productStockService.find(id)
            .subscribe((productStockResponse: HttpResponse<ProductStockMc>) => {
                this.productStock = productStockResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInProductStocks() {
        this.eventSubscriber = this.eventManager.subscribe(
            'productStockListModification',
            (response) => this.load(this.productStock.id)
        );
    }
}
