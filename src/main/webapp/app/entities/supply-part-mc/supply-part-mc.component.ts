import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { SupplyPartMc } from './supply-part-mc.model';
import { SupplyPartMcService } from './supply-part-mc.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-supply-part-mc',
    templateUrl: './supply-part-mc.component.html'
})
export class SupplyPartMcComponent implements OnInit, OnDestroy {
supplyParts: SupplyPartMc[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private supplyPartService: SupplyPartMcService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.supplyPartService.query().subscribe(
            (res: HttpResponse<SupplyPartMc[]>) => {
                this.supplyParts = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInSupplyParts();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: SupplyPartMc) {
        return item.id;
    }
    registerChangeInSupplyParts() {
        this.eventSubscriber = this.eventManager.subscribe('supplyPartListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
