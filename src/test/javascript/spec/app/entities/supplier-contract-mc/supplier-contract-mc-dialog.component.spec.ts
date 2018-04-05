/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { McErpTestModule } from '../../../test.module';
import { SupplierContractMcDialogComponent } from '../../../../../../main/webapp/app/entities/supplier-contract-mc/supplier-contract-mc-dialog.component';
import { SupplierContractMcService } from '../../../../../../main/webapp/app/entities/supplier-contract-mc/supplier-contract-mc.service';
import { SupplierContractMc } from '../../../../../../main/webapp/app/entities/supplier-contract-mc/supplier-contract-mc.model';
import { PurchaseOrderMcService } from '../../../../../../main/webapp/app/entities/purchase-order-mc';
import { SupplyPartContractMcService } from '../../../../../../main/webapp/app/entities/supply-part-contract-mc';

describe('Component Tests', () => {

    describe('SupplierContractMc Management Dialog Component', () => {
        let comp: SupplierContractMcDialogComponent;
        let fixture: ComponentFixture<SupplierContractMcDialogComponent>;
        let service: SupplierContractMcService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [McErpTestModule],
                declarations: [SupplierContractMcDialogComponent],
                providers: [
                    PurchaseOrderMcService,
                    SupplyPartContractMcService,
                    SupplierContractMcService
                ]
            })
            .overrideTemplate(SupplierContractMcDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SupplierContractMcDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SupplierContractMcService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new SupplierContractMc(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.supplierContract = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'supplierContractListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new SupplierContractMc();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.supplierContract = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'supplierContractListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
