import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { SupplierContractMc } from './supplier-contract-mc.model';
import { SupplierContractMcService } from './supplier-contract-mc.service';

@Component({
    selector: 'jhi-supplier-contract-mc-detail',
    templateUrl: './supplier-contract-mc-detail.component.html'
})
export class SupplierContractMcDetailComponent implements OnInit, OnDestroy {

    supplierContract: SupplierContractMc;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private supplierContractService: SupplierContractMcService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInSupplierContracts();
    }

    load(id) {
        this.supplierContractService.find(id)
            .subscribe((supplierContractResponse: HttpResponse<SupplierContractMc>) => {
                this.supplierContract = supplierContractResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInSupplierContracts() {
        this.eventSubscriber = this.eventManager.subscribe(
            'supplierContractListModification',
            (response) => this.load(this.supplierContract.id)
        );
    }
}
