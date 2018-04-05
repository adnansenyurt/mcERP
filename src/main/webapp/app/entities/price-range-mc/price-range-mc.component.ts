import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { PriceRangeMc } from './price-range-mc.model';
import { PriceRangeMcService } from './price-range-mc.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-price-range-mc',
    templateUrl: './price-range-mc.component.html'
})
export class PriceRangeMcComponent implements OnInit, OnDestroy {
priceRanges: PriceRangeMc[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private priceRangeService: PriceRangeMcService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.priceRangeService.query().subscribe(
            (res: HttpResponse<PriceRangeMc[]>) => {
                this.priceRanges = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInPriceRanges();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: PriceRangeMc) {
        return item.id;
    }
    registerChangeInPriceRanges() {
        this.eventSubscriber = this.eventManager.subscribe('priceRangeListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
