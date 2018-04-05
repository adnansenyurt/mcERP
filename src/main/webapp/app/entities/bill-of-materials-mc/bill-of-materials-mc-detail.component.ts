import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { BillOfMaterialsMc } from './bill-of-materials-mc.model';
import { BillOfMaterialsMcService } from './bill-of-materials-mc.service';

@Component({
    selector: 'jhi-bill-of-materials-mc-detail',
    templateUrl: './bill-of-materials-mc-detail.component.html'
})
export class BillOfMaterialsMcDetailComponent implements OnInit, OnDestroy {

    billOfMaterials: BillOfMaterialsMc;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private billOfMaterialsService: BillOfMaterialsMcService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInBillOfMaterials();
    }

    load(id) {
        this.billOfMaterialsService.find(id)
            .subscribe((billOfMaterialsResponse: HttpResponse<BillOfMaterialsMc>) => {
                this.billOfMaterials = billOfMaterialsResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInBillOfMaterials() {
        this.eventSubscriber = this.eventManager.subscribe(
            'billOfMaterialsListModification',
            (response) => this.load(this.billOfMaterials.id)
        );
    }
}
