import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { SupplierContractMc } from './supplier-contract-mc.model';
import { SupplierContractMcService } from './supplier-contract-mc.service';

@Injectable()
export class SupplierContractMcPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private supplierContractService: SupplierContractMcService

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
                this.supplierContractService.find(id)
                    .subscribe((supplierContractResponse: HttpResponse<SupplierContractMc>) => {
                        const supplierContract: SupplierContractMc = supplierContractResponse.body;
                        supplierContract.dateSigned = this.datePipe
                            .transform(supplierContract.dateSigned, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.supplierContractModalRef(component, supplierContract);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.supplierContractModalRef(component, new SupplierContractMc());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    supplierContractModalRef(component: Component, supplierContract: SupplierContractMc): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.supplierContract = supplierContract;
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
