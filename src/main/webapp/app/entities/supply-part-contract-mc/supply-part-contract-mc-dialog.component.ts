import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SupplyPartContractMc } from './supply-part-contract-mc.model';
import { SupplyPartContractMcPopupService } from './supply-part-contract-mc-popup.service';
import { SupplyPartContractMcService } from './supply-part-contract-mc.service';

@Component({
    selector: 'jhi-supply-part-contract-mc-dialog',
    templateUrl: './supply-part-contract-mc-dialog.component.html'
})
export class SupplyPartContractMcDialogComponent implements OnInit {

    supplyPartContract: SupplyPartContractMc;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private supplyPartContractService: SupplyPartContractMcService,
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
        if (this.supplyPartContract.id !== undefined) {
            this.subscribeToSaveResponse(
                this.supplyPartContractService.update(this.supplyPartContract));
        } else {
            this.subscribeToSaveResponse(
                this.supplyPartContractService.create(this.supplyPartContract));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<SupplyPartContractMc>>) {
        result.subscribe((res: HttpResponse<SupplyPartContractMc>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: SupplyPartContractMc) {
        this.eventManager.broadcast({ name: 'supplyPartContractListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-supply-part-contract-mc-popup',
    template: ''
})
export class SupplyPartContractMcPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private supplyPartContractPopupService: SupplyPartContractMcPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.supplyPartContractPopupService
                    .open(SupplyPartContractMcDialogComponent as Component, params['id']);
            } else {
                this.supplyPartContractPopupService
                    .open(SupplyPartContractMcDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
