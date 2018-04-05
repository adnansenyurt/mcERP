import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ProductStockMc } from './product-stock-mc.model';
import { ProductStockMcPopupService } from './product-stock-mc-popup.service';
import { ProductStockMcService } from './product-stock-mc.service';
import { ProductMc, ProductMcService } from '../product-mc';

@Component({
    selector: 'jhi-product-stock-mc-dialog',
    templateUrl: './product-stock-mc-dialog.component.html'
})
export class ProductStockMcDialogComponent implements OnInit {

    productStock: ProductStockMc;
    isSaving: boolean;

    products: ProductMc[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private productStockService: ProductStockMcService,
        private productService: ProductMcService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.productService.query()
            .subscribe((res: HttpResponse<ProductMc[]>) => { this.products = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.productStock.id !== undefined) {
            this.subscribeToSaveResponse(
                this.productStockService.update(this.productStock));
        } else {
            this.subscribeToSaveResponse(
                this.productStockService.create(this.productStock));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ProductStockMc>>) {
        result.subscribe((res: HttpResponse<ProductStockMc>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ProductStockMc) {
        this.eventManager.broadcast({ name: 'productStockListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackProductById(index: number, item: ProductMc) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-product-stock-mc-popup',
    template: ''
})
export class ProductStockMcPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private productStockPopupService: ProductStockMcPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.productStockPopupService
                    .open(ProductStockMcDialogComponent as Component, params['id']);
            } else {
                this.productStockPopupService
                    .open(ProductStockMcDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
