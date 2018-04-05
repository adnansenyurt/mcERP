import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { SupplierMc } from './supplier-mc.model';
import { SupplierMcService } from './supplier-mc.service';

@Component({
    selector: 'jhi-supplier-mc-detail',
    templateUrl: './supplier-mc-detail.component.html'
})
export class SupplierMcDetailComponent implements OnInit, OnDestroy {

    supplier: SupplierMc;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private supplierService: SupplierMcService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInSuppliers();
    }

    load(id) {
        this.supplierService.find(id)
            .subscribe((supplierResponse: HttpResponse<SupplierMc>) => {
                this.supplier = supplierResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInSuppliers() {
        this.eventSubscriber = this.eventManager.subscribe(
            'supplierListModification',
            (response) => this.load(this.supplier.id)
        );
    }
}
