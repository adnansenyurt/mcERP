import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { CashFlowMc } from './cash-flow-mc.model';
import { CashFlowMcService } from './cash-flow-mc.service';

@Injectable()
export class CashFlowMcPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private cashFlowService: CashFlowMcService

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
                this.cashFlowService.find(id)
                    .subscribe((cashFlowResponse: HttpResponse<CashFlowMc>) => {
                        const cashFlow: CashFlowMc = cashFlowResponse.body;
                        cashFlow.datePayment = this.datePipe
                            .transform(cashFlow.datePayment, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.cashFlowModalRef(component, cashFlow);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.cashFlowModalRef(component, new CashFlowMc());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    cashFlowModalRef(component: Component, cashFlow: CashFlowMc): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.cashFlow = cashFlow;
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
