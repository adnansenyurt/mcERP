import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { SupplyPartMc } from './supply-part-mc.model';
import { SupplyPartMcPopupService } from './supply-part-mc-popup.service';
import { SupplyPartMcService } from './supply-part-mc.service';
import { SupplyPartContractMc, SupplyPartContractMcService } from '../supply-part-contract-mc';
import { BillOfMaterialsMc, BillOfMaterialsMcService } from '../bill-of-materials-mc';

@Component({
    selector: 'jhi-supply-part-mc-dialog',
    templateUrl: './supply-part-mc-dialog.component.html'
})
export class SupplyPartMcDialogComponent implements OnInit {

    supplyPart: SupplyPartMc;
    isSaving: boolean;

    contracts: SupplyPartContractMc[];

    billofmaterials: BillOfMaterialsMc[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private supplyPartService: SupplyPartMcService,
        private supplyPartContractService: SupplyPartContractMcService,
        private billOfMaterialsService: BillOfMaterialsMcService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.supplyPartContractService
            .query({filter: 'supplypart-is-null'})
            .subscribe((res: HttpResponse<SupplyPartContractMc[]>) => {
                if (!this.supplyPart.contractId) {
                    this.contracts = res.body;
                } else {
                    this.supplyPartContractService
                        .find(this.supplyPart.contractId)
                        .subscribe((subRes: HttpResponse<SupplyPartContractMc>) => {
                            this.contracts = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.billOfMaterialsService.query()
            .subscribe((res: HttpResponse<BillOfMaterialsMc[]>) => { this.billofmaterials = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.supplyPart.id !== undefined) {
            this.subscribeToSaveResponse(
                this.supplyPartService.update(this.supplyPart));
        } else {
            this.subscribeToSaveResponse(
                this.supplyPartService.create(this.supplyPart));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<SupplyPartMc>>) {
        result.subscribe((res: HttpResponse<SupplyPartMc>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: SupplyPartMc) {
        this.eventManager.broadcast({ name: 'supplyPartListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackSupplyPartContractById(index: number, item: SupplyPartContractMc) {
        return item.id;
    }

    trackBillOfMaterialsById(index: number, item: BillOfMaterialsMc) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-supply-part-mc-popup',
    template: ''
})
export class SupplyPartMcPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private supplyPartPopupService: SupplyPartMcPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.supplyPartPopupService
                    .open(SupplyPartMcDialogComponent as Component, params['id']);
            } else {
                this.supplyPartPopupService
                    .open(SupplyPartMcDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
