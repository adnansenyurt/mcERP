import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { PriceRangeMc } from './price-range-mc.model';
import { PriceRangeMcService } from './price-range-mc.service';

@Injectable()
export class PriceRangeMcPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private priceRangeService: PriceRangeMcService

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
                this.priceRangeService.find(id)
                    .subscribe((priceRangeResponse: HttpResponse<PriceRangeMc>) => {
                        const priceRange: PriceRangeMc = priceRangeResponse.body;
                        this.ngbModalRef = this.priceRangeModalRef(component, priceRange);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.priceRangeModalRef(component, new PriceRangeMc());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    priceRangeModalRef(component: Component, priceRange: PriceRangeMc): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.priceRange = priceRange;
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
