import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { BillOfMaterialsMc } from './bill-of-materials-mc.model';
import { BillOfMaterialsMcPopupService } from './bill-of-materials-mc-popup.service';
import { BillOfMaterialsMcService } from './bill-of-materials-mc.service';
import { ProductMc, ProductMcService } from '../product-mc';
import { SupplyPartMc, SupplyPartMcService } from '../supply-part-mc';

@Component({
    selector: 'jhi-bill-of-materials-mc-dialog',
    templateUrl: './bill-of-materials-mc-dialog.component.html'
})
export class BillOfMaterialsMcDialogComponent implements OnInit {

    billOfMaterials: BillOfMaterialsMc;
    isSaving: boolean;

    products: ProductMc[];

    supplyparts: SupplyPartMc[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private billOfMaterialsService: BillOfMaterialsMcService,
        private productService: ProductMcService,
        private supplyPartService: SupplyPartMcService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.productService
            .query({filter: 'billofmaterials-is-null'})
            .subscribe((res: HttpResponse<ProductMc[]>) => {
                if (!this.billOfMaterials.productId) {
                    this.products = res.body;
                } else {
                    this.productService
                        .find(this.billOfMaterials.productId)
                        .subscribe((subRes: HttpResponse<ProductMc>) => {
                            this.products = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.supplyPartService.query()
            .subscribe((res: HttpResponse<SupplyPartMc[]>) => { this.supplyparts = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.billOfMaterials.id !== undefined) {
            this.subscribeToSaveResponse(
                this.billOfMaterialsService.update(this.billOfMaterials));
        } else {
            this.subscribeToSaveResponse(
                this.billOfMaterialsService.create(this.billOfMaterials));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<BillOfMaterialsMc>>) {
        result.subscribe((res: HttpResponse<BillOfMaterialsMc>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: BillOfMaterialsMc) {
        this.eventManager.broadcast({ name: 'billOfMaterialsListModification', content: 'OK'});
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

    trackSupplyPartById(index: number, item: SupplyPartMc) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-bill-of-materials-mc-popup',
    template: ''
})
export class BillOfMaterialsMcPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private billOfMaterialsPopupService: BillOfMaterialsMcPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.billOfMaterialsPopupService
                    .open(BillOfMaterialsMcDialogComponent as Component, params['id']);
            } else {
                this.billOfMaterialsPopupService
                    .open(BillOfMaterialsMcDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
