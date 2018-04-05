import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { SupplyPartContractMc } from './supply-part-contract-mc.model';
import { SupplyPartContractMcService } from './supply-part-contract-mc.service';

@Injectable()
export class SupplyPartContractMcPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private supplyPartContractService: SupplyPartContractMcService

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
                this.supplyPartContractService.find(id)
                    .subscribe((supplyPartContractResponse: HttpResponse<SupplyPartContractMc>) => {
                        const supplyPartContract: SupplyPartContractMc = supplyPartContractResponse.body;
                        this.ngbModalRef = this.supplyPartContractModalRef(component, supplyPartContract);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.supplyPartContractModalRef(component, new SupplyPartContractMc());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    supplyPartContractModalRef(component: Component, supplyPartContract: SupplyPartContractMc): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.supplyPartContract = supplyPartContract;
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
