import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { SupplierContractMc } from './supplier-contract-mc.model';
import { SupplierContractMcPopupService } from './supplier-contract-mc-popup.service';
import { SupplierContractMcService } from './supplier-contract-mc.service';
import { PurchaseOrderMc, PurchaseOrderMcService } from '../purchase-order-mc';
import { SupplyPartContractMc, SupplyPartContractMcService } from '../supply-part-contract-mc';

@Component({
    selector: 'jhi-supplier-contract-mc-dialog',
    templateUrl: './supplier-contract-mc-dialog.component.html'
})
export class SupplierContractMcDialogComponent implements OnInit {

    supplierContract: SupplierContractMc;
    isSaving: boolean;

    purchaseorders: PurchaseOrderMc[];

    supplypartcontracts: SupplyPartContractMc[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private supplierContractService: SupplierContractMcService,
        private purchaseOrderService: PurchaseOrderMcService,
        private supplyPartContractService: SupplyPartContractMcService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.purchaseOrderService.query()
            .subscribe((res: HttpResponse<PurchaseOrderMc[]>) => { this.purchaseorders = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.supplyPartContractService.query()
            .subscribe((res: HttpResponse<SupplyPartContractMc[]>) => { this.supplypartcontracts = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.supplierContract.id !== undefined) {
            this.subscribeToSaveResponse(
                this.supplierContractService.update(this.supplierContract));
        } else {
            this.subscribeToSaveResponse(
                this.supplierContractService.create(this.supplierContract));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<SupplierContractMc>>) {
        result.subscribe((res: HttpResponse<SupplierContractMc>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: SupplierContractMc) {
        this.eventManager.broadcast({ name: 'supplierContractListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackPurchaseOrderById(index: number, item: PurchaseOrderMc) {
        return item.id;
    }

    trackSupplyPartContractById(index: number, item: SupplyPartContractMc) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-supplier-contract-mc-popup',
    template: ''
})
export class SupplierContractMcPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private supplierContractPopupService: SupplierContractMcPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.supplierContractPopupService
                    .open(SupplierContractMcDialogComponent as Component, params['id']);
            } else {
                this.supplierContractPopupService
                    .open(SupplierContractMcDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
