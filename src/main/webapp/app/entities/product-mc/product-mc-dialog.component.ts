import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ProductMc } from './product-mc.model';
import { ProductMcPopupService } from './product-mc-popup.service';
import { ProductMcService } from './product-mc.service';
import { OpportunityMc, OpportunityMcService } from '../opportunity-mc';
import { ProductStockMc, ProductStockMcService } from '../product-stock-mc';

@Component({
    selector: 'jhi-product-mc-dialog',
    templateUrl: './product-mc-dialog.component.html'
})
export class ProductMcDialogComponent implements OnInit {

    product: ProductMc;
    isSaving: boolean;

    opportunities: OpportunityMc[];

    productstocks: ProductStockMc[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private productService: ProductMcService,
        private opportunityService: OpportunityMcService,
        private productStockService: ProductStockMcService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.opportunityService.query()
            .subscribe((res: HttpResponse<OpportunityMc[]>) => { this.opportunities = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.productStockService.query()
            .subscribe((res: HttpResponse<ProductStockMc[]>) => { this.productstocks = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.product.id !== undefined) {
            this.subscribeToSaveResponse(
                this.productService.update(this.product));
        } else {
            this.subscribeToSaveResponse(
                this.productService.create(this.product));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ProductMc>>) {
        result.subscribe((res: HttpResponse<ProductMc>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ProductMc) {
        this.eventManager.broadcast({ name: 'productListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackOpportunityById(index: number, item: OpportunityMc) {
        return item.id;
    }

    trackProductStockById(index: number, item: ProductStockMc) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-product-mc-popup',
    template: ''
})
export class ProductMcPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private productPopupService: ProductMcPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.productPopupService
                    .open(ProductMcDialogComponent as Component, params['id']);
            } else {
                this.productPopupService
                    .open(ProductMcDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
