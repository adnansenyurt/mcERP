import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { PriceRangeMc } from './price-range-mc.model';
import { PriceRangeMcPopupService } from './price-range-mc-popup.service';
import { PriceRangeMcService } from './price-range-mc.service';
import { SupplyPartContractMc, SupplyPartContractMcService } from '../supply-part-contract-mc';

@Component({
    selector: 'jhi-price-range-mc-dialog',
    templateUrl: './price-range-mc-dialog.component.html'
})
export class PriceRangeMcDialogComponent implements OnInit {

    priceRange: PriceRangeMc;
    isSaving: boolean;

    contracts: SupplyPartContractMc[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private priceRangeService: PriceRangeMcService,
        private supplyPartContractService: SupplyPartContractMcService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.supplyPartContractService
            .query({filter: 'pricerange-is-null'})
            .subscribe((res: HttpResponse<SupplyPartContractMc[]>) => {
                if (!this.priceRange.contractId) {
                    this.contracts = res.body;
                } else {
                    this.supplyPartContractService
                        .find(this.priceRange.contractId)
                        .subscribe((subRes: HttpResponse<SupplyPartContractMc>) => {
                            this.contracts = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.priceRange.id !== undefined) {
            this.subscribeToSaveResponse(
                this.priceRangeService.update(this.priceRange));
        } else {
            this.subscribeToSaveResponse(
                this.priceRangeService.create(this.priceRange));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<PriceRangeMc>>) {
        result.subscribe((res: HttpResponse<PriceRangeMc>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: PriceRangeMc) {
        this.eventManager.broadcast({ name: 'priceRangeListModification', content: 'OK'});
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
}

@Component({
    selector: 'jhi-price-range-mc-popup',
    template: ''
})
export class PriceRangeMcPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private priceRangePopupService: PriceRangeMcPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.priceRangePopupService
                    .open(PriceRangeMcDialogComponent as Component, params['id']);
            } else {
                this.priceRangePopupService
                    .open(PriceRangeMcDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
