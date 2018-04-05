import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { OpportunityMc } from './opportunity-mc.model';
import { OpportunityMcPopupService } from './opportunity-mc-popup.service';
import { OpportunityMcService } from './opportunity-mc.service';

@Component({
    selector: 'jhi-opportunity-mc-delete-dialog',
    templateUrl: './opportunity-mc-delete-dialog.component.html'
})
export class OpportunityMcDeleteDialogComponent {

    opportunity: OpportunityMc;

    constructor(
        private opportunityService: OpportunityMcService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.opportunityService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'opportunityListModification',
                content: 'Deleted an opportunity'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-opportunity-mc-delete-popup',
    template: ''
})
export class OpportunityMcDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private opportunityPopupService: OpportunityMcPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.opportunityPopupService
                .open(OpportunityMcDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
