import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ContactPersonMc } from './contact-person-mc.model';
import { ContactPersonMcPopupService } from './contact-person-mc-popup.service';
import { ContactPersonMcService } from './contact-person-mc.service';

@Component({
    selector: 'jhi-contact-person-mc-delete-dialog',
    templateUrl: './contact-person-mc-delete-dialog.component.html'
})
export class ContactPersonMcDeleteDialogComponent {

    contactPerson: ContactPersonMc;

    constructor(
        private contactPersonService: ContactPersonMcService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.contactPersonService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'contactPersonListModification',
                content: 'Deleted an contactPerson'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-contact-person-mc-delete-popup',
    template: ''
})
export class ContactPersonMcDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private contactPersonPopupService: ContactPersonMcPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.contactPersonPopupService
                .open(ContactPersonMcDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
