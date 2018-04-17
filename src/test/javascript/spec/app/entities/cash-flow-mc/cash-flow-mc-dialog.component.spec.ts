/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { McErpTestModule } from '../../../test.module';
import { CashFlowMcDialogComponent } from '../../../../../../main/webapp/app/entities/cash-flow-mc/cash-flow-mc-dialog.component';
import { CashFlowMcService } from '../../../../../../main/webapp/app/entities/cash-flow-mc/cash-flow-mc.service';
import { CashFlowMc } from '../../../../../../main/webapp/app/entities/cash-flow-mc/cash-flow-mc.model';
import { PurchaseOrderMcService } from '../../../../../../main/webapp/app/entities/purchase-order-mc';
import { CustomerOrderMcService } from '../../../../../../main/webapp/app/entities/customer-order-mc';

describe('Component Tests', () => {

    describe('CashFlowMc Management Dialog Component', () => {
        let comp: CashFlowMcDialogComponent;
        let fixture: ComponentFixture<CashFlowMcDialogComponent>;
        let service: CashFlowMcService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [McErpTestModule],
                declarations: [CashFlowMcDialogComponent],
                providers: [
                    PurchaseOrderMcService,
                    CustomerOrderMcService,
                    CashFlowMcService
                ]
            })
            .overrideTemplate(CashFlowMcDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CashFlowMcDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CashFlowMcService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CashFlowMc(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.cashFlow = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'cashFlowListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CashFlowMc();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.cashFlow = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'cashFlowListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
