import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { OpportunityMc } from './opportunity-mc.model';
import { OpportunityMcService } from './opportunity-mc.service';

@Injectable()
export class OpportunityMcPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private opportunityService: OpportunityMcService

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
                this.opportunityService.find(id)
                    .subscribe((opportunityResponse: HttpResponse<OpportunityMc>) => {
                        const opportunity: OpportunityMc = opportunityResponse.body;
                        opportunity.dateOpened = this.datePipe
                            .transform(opportunity.dateOpened, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.opportunityModalRef(component, opportunity);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.opportunityModalRef(component, new OpportunityMc());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    opportunityModalRef(component: Component, opportunity: OpportunityMc): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.opportunity = opportunity;
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
