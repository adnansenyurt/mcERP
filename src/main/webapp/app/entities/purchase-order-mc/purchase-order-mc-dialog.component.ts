import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { PurchaseOrderMc } from './purchase-order-mc.model';
import { PurchaseOrderMcPopupService } from './purchase-order-mc-popup.service';
import { PurchaseOrderMcService } from './purchase-order-mc.service';
import { SupplierMc, SupplierMcService } from '../supplier-mc';
import { SupplierContractMc, SupplierContractMcService } from '../supplier-contract-mc';

@Component({
    selector: 'jhi-purchase-order-mc-dialog',
    templateUrl: './purchase-order-mc-dialog.component.html'
})
export class PurchaseOrderMcDialogComponent implements OnInit {

    purchaseOrder: PurchaseOrderMc;
    isSaving: boolean;

    suppliers: SupplierMc[];

    suppliercontracts: SupplierContractMc[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private purchaseOrderService: PurchaseOrderMcService,
        private supplierService: SupplierMcService,
        private supplierContractService: SupplierContractMcService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.supplierService.query()
            .subscribe((res: HttpResponse<SupplierMc[]>) => { this.suppliers = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.supplierContractService.query()
            .subscribe((res: HttpResponse<SupplierContractMc[]>) => { this.suppliercontracts = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.purchaseOrder.id !== undefined) {
            this.subscribeToSaveResponse(
                this.purchaseOrderService.update(this.purchaseOrder));
        } else {
            this.subscribeToSaveResponse(
                this.purchaseOrderService.create(this.purchaseOrder));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<PurchaseOrderMc>>) {
        result.subscribe((res: HttpResponse<PurchaseOrderMc>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: PurchaseOrderMc) {
        this.eventManager.broadcast({ name: 'purchaseOrderListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackSupplierById(index: number, item: SupplierMc) {
        return item.id;
    }

    trackSupplierContractById(index: number, item: SupplierContractMc) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-purchase-order-mc-popup',
    template: ''
})
export class PurchaseOrderMcPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private purchaseOrderPopupService: PurchaseOrderMcPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.purchaseOrderPopupService
                    .open(PurchaseOrderMcDialogComponent as Component, params['id']);
            } else {
                this.purchaseOrderPopupService
                    .open(PurchaseOrderMcDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
