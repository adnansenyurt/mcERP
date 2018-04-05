import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { PriceRangeMc } from './price-range-mc.model';
import { PriceRangeMcPopupService } from './price-range-mc-popup.service';
import { PriceRangeMcService } from './price-range-mc.service';

@Component({
    selector: 'jhi-price-range-mc-delete-dialog',
    templateUrl: './price-range-mc-delete-dialog.component.html'
})
export class PriceRangeMcDeleteDialogComponent {

    priceRange: PriceRangeMc;

    constructor(
        private priceRangeService: PriceRangeMcService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.priceRangeService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'priceRangeListModification',
                content: 'Deleted an priceRange'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-price-range-mc-delete-popup',
    template: ''
})
export class PriceRangeMcDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private priceRangePopupService: PriceRangeMcPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.priceRangePopupService
                .open(PriceRangeMcDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
