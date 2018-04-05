import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { ContactPersonMc } from './contact-person-mc.model';
import { ContactPersonMcService } from './contact-person-mc.service';

@Injectable()
export class ContactPersonMcPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private contactPersonService: ContactPersonMcService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.contactPersonService.find(id)
                    .subscribe((contactPersonResponse: HttpResponse<ContactPersonMc>) => {
                        const contactPerson: ContactPersonMc = contactPersonResponse.body;
                        this.ngbModalRef = this.contactPersonModalRef(component, contactPerson);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.contactPersonModalRef(component, new ContactPersonMc());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    contactPersonModalRef(component: Component, contactPerson: ContactPersonMc): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.contactPerson = contactPerson;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
