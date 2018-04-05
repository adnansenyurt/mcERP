import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SupplierMc } from './supplier-mc.model';
import { SupplierMcPopupService } from './supplier-mc-popup.service';
import { SupplierMcService } from './supplier-mc.service';

@Component({
    selector: 'jhi-supplier-mc-dialog',
    templateUrl: './supplier-mc-dialog.component.html'
})
export class SupplierMcDialogComponent implements OnInit {

    supplier: SupplierMc;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private supplierService: SupplierMcService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
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
