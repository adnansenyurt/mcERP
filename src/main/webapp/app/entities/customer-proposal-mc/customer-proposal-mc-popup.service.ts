import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { CustomerProposalMc } from './customer-proposal-mc.model';
import { CustomerProposalMcService } from './customer-proposal-mc.service';

@Injectable()
export class CustomerProposalMcPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private customerProposalService: CustomerProposalMcService

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
                this.customerProposalService.find(id)
                    .subscribe((customerProposalResponse: HttpResponse<CustomerProposalMc>) => {
                        const customerProposal: CustomerProposalMc = customerProposalResponse.body;
                        customerProposal.dateSubmitted = this.datePipe
                            .transform(customerProposal.dateSubmitted, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.customerProposalModalRef(component, customerProposal);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.customerProposalModalRef(component, new CustomerProposalMc());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    customerProposalModalRef(component: Component, customerProposal: CustomerProposalMc): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.customerProposal = customerProposal;
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
