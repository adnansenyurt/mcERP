import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SupplierContractMc } from './supplier-contract-mc.model';
import { SupplierContractMcPopupService } from './supplier-contract-mc-popup.service';
import { SupplierContractMcService } from './supplier-contract-mc.service';

@Component({
    selector: 'jhi-supplier-contract-mc-dialog',
    templateUrl: './supplier-contract-mc-dialog.component.html'
})
export class SupplierContractMcDialogComponent implements OnInit {

    supplierContract: SupplierContractMc;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private supplierContractService: SupplierContractMcService,
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
