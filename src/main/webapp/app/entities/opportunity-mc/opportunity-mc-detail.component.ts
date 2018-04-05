import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { OpportunityMc } from './opportunity-mc.model';
import { OpportunityMcService } from './opportunity-mc.service';

@Component({
    selector: 'jhi-opportunity-mc-detail',
    templateUrl: './opportunity-mc-detail.component.html'
})
export class OpportunityMcDetailComponent implements OnInit, OnDestroy {

    opportunity: OpportunityMc;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private opportunityService: OpportunityMcService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInOpportunities();
    }

    load(id) {
        this.opportunityService.find(id)
            .subscribe((opportunityResponse: HttpResponse<OpportunityMc>) => {
                this.opportunity = opportunityResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInOpportunities() {
        this.eventSubscriber = this.eventManager.subscribe(
            'opportunityListModification',
            (response) => this.load(this.opportunity.id)
        );
    }
}
