/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { McErpTestModule } from '../../../test.module';
import { CustomerProposalMcDialogComponent } from '../../../../../../main/webapp/app/entities/customer-proposal-mc/customer-proposal-mc-dialog.component';
import { CustomerProposalMcService } from '../../../../../../main/webapp/app/entities/customer-proposal-mc/customer-proposal-mc.service';
import { CustomerProposalMc } from '../../../../../../main/webapp/app/entities/customer-proposal-mc/customer-proposal-mc.model';
import { OpportunityMcService } from '../../../../../../main/webapp/app/entities/opportunity-mc';
import { CustomerOrderMcService } from '../../../../../../main/webapp/app/entities/customer-order-mc';
import { CustomerMcService } from '../../../../../../main/webapp/app/entities/customer-mc';

describe('Component Tests', () => {

    describe('CustomerProposalMc Management Dialog Component', () => {
        let comp: CustomerProposalMcDialogComponent;
        let fixture: ComponentFixture<CustomerProposalMcDialogComponent>;
        let service: CustomerProposalMcService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [McErpTestModule],
                declarations: [CustomerProposalMcDialogComponent],
                providers: [
                    OpportunityMcService,
                    CustomerOrderMcService,
                    CustomerMcService,
                    CustomerProposalMcService
                ]
            })
            .overrideTemplate(CustomerProposalMcDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CustomerProposalMcDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CustomerProposalMcService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CustomerProposalMc(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.customerProposal = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'customerProposalListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CustomerProposalMc();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.customerProposal = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'customerProposalListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
