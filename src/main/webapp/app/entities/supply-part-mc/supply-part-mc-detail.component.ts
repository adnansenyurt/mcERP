import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { SupplyPartMc } from './supply-part-mc.model';
import { SupplyPartMcService } from './supply-part-mc.service';

@Component({
    selector: 'jhi-supply-part-mc-detail',
    templateUrl: './supply-part-mc-detail.component.html'
})
export class SupplyPartMcDetailComponent implements OnInit, OnDestroy {

    supplyPart: SupplyPartMc;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private supplyPartService: SupplyPartMcService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInSupplyParts();
    }

    load(id) {
        this.supplyPartService.find(id)
            .subscribe((supplyPartResponse: HttpResponse<SupplyPartMc>) => {
                this.supplyPart = supplyPartResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInSupplyParts() {
        this.eventSubscriber = this.eventManager.subscribe(
            'supplyPartListModification',
            (response) => this.load(this.supplyPart.id)
        );
    }
}
