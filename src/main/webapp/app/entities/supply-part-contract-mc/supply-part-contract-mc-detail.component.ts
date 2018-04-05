import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { SupplyPartContractMc } from './supply-part-contract-mc.model';
import { SupplyPartContractMcService } from './supply-part-contract-mc.service';

@Component({
    selector: 'jhi-supply-part-contract-mc-detail',
    templateUrl: './supply-part-contract-mc-detail.component.html'
})
export class SupplyPartContractMcDetailComponent implements OnInit, OnDestroy {

    supplyPartContract: SupplyPartContractMc;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private supplyPartContractService: SupplyPartContractMcService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInSupplyPartContracts();
    }

    load(id) {
        this.supplyPartContractService.find(id)
            .subscribe((supplyPartContractResponse: HttpResponse<SupplyPartContractMc>) => {
                this.supplyPartContract = supplyPartContractResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInSupplyPartContracts() {
        this.eventSubscriber = this.eventManager.subscribe(
            'supplyPartContractListModification',
            (response) => this.load(this.supplyPartContract.id)
        );
    }
}
