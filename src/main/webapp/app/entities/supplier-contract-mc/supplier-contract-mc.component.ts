import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { SupplierContractMc } from './supplier-contract-mc.model';
import { SupplierContractMcService } from './supplier-contract-mc.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-supplier-contract-mc',
    templateUrl: './supplier-contract-mc.component.html'
})
export class SupplierContractMcComponent implements OnInit, OnDestroy {
supplierContracts: SupplierContractMc[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private supplierContractService: SupplierContractMcService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.supplierContractService.query().subscribe(
            (res: HttpResponse<SupplierContractMc[]>) => {
                this.supplierContracts = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInSupplierContracts();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: SupplierContractMc) {
        return item.id;
    }
    registerChangeInSupplierContracts() {
        this.eventSubscriber = this.eventManager.subscribe('supplierContractListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
