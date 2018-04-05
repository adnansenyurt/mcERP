import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { SupplierMc } from './supplier-mc.model';
import { SupplierMcPopupService } from './supplier-mc-popup.service';
import { SupplierMcService } from './supplier-mc.service';
import { ContactPersonMc, ContactPersonMcService } from '../contact-person-mc';
import { PurchaseOrderMc, PurchaseOrderMcService } from '../purchase-order-mc';

@Component({
    selector: 'jhi-supplier-mc-dialog',
    templateUrl: './supplier-mc-dialog.component.html'
})
export class SupplierMcDialogComponent implements OnInit {

    supplier: SupplierMc;
    isSaving: boolean;

    contactpeople: ContactPersonMc[];

    purchaseorders: PurchaseOrderMc[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private supplierService: SupplierMcService,
        private contactPersonService: ContactPersonMcService,
        private purchaseOrderService: PurchaseOrderMcService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.contactPersonService.query()
            .subscribe((res: HttpResponse<ContactPersonMc[]>) => { this.contactpeople = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.purchaseOrderService.query()
            .subscribe((res: HttpResponse<PurchaseOrderMc[]>) => { this.purchaseorders = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.supplier.id !== undefined) {
            this.subscribeToSaveResponse(
                this.supplierService.update(this.supplier));
        } else {
            this.subscribeToSaveResponse(
                this.supplierService.create(this.supplier));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<SupplierMc>>) {
        result.subscribe((res: HttpResponse<SupplierMc>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: SupplierMc) {
        this.eventManager.broadcast({ name: 'supplierListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackContactPersonById(index: number, item: ContactPersonMc) {
        return item.id;
    }

    trackPurchaseOrderById(index: number, item: PurchaseOrderMc) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-supplier-mc-popup',
    template: ''
})
export class SupplierMcPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private supplierPopupService: SupplierMcPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.supplierPopupService
                    .open(SupplierMcDialogComponent as Component, params['id']);
            } else {
                this.supplierPopupService
                    .open(SupplierMcDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
