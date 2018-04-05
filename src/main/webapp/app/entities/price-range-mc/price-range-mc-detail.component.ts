import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { PriceRangeMc } from './price-range-mc.model';
import { PriceRangeMcService } from './price-range-mc.service';

@Component({
    selector: 'jhi-price-range-mc-detail',
    templateUrl: './price-range-mc-detail.component.html'
})
export class PriceRangeMcDetailComponent implements OnInit, OnDestroy {

    priceRange: PriceRangeMc;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private priceRangeService: PriceRangeMcService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPriceRanges();
    }

    load(id) {
        this.priceRangeService.find(id)
            .subscribe((priceRangeResponse: HttpResponse<PriceRangeMc>) => {
                this.priceRange = priceRangeResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPriceRanges() {
        this.eventSubscriber = this.eventManager.subscribe(
            'priceRangeListModification',
            (response) => this.load(this.priceRange.id)
        );
    }
}
