/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { McErpTestModule } from '../../../test.module';
import { OpportunityMcDialogComponent } from '../../../../../../main/webapp/app/entities/opportunity-mc/opportunity-mc-dialog.component';
import { OpportunityMcService } from '../../../../../../main/webapp/app/entities/opportunity-mc/opportunity-mc.service';
import { OpportunityMc } from '../../../../../../main/webapp/app/entities/opportunity-mc/opportunity-mc.model';
import { CustomerMcService } from '../../../../../../main/webapp/app/entities/customer-mc';
import { CustomerProposalMcService } from '../../../../../../main/webapp/app/entities/customer-proposal-mc';
import { ProductMcService } from '../../../../../../main/webapp/app/entities/product-mc';

describe('Component Tests', () => {

    describe('OpportunityMc Management Dialog Component', () => {
        let comp: OpportunityMcDialogComponent;
        let fixture: ComponentFixture<OpportunityMcDialogComponent>;
        let service: OpportunityMcService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [McErpTestModule],
                declarations: [OpportunityMcDialogComponent],
                providers: [
                    CustomerMcService,
                    CustomerProposalMcService,
                    ProductMcService,
                    OpportunityMcService
                ]
            })
            .overrideTemplate(OpportunityMcDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OpportunityMcDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OpportunityMcService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new OpportunityMc(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.opportunity = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'opportunityListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new OpportunityMc();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.opportunity = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'opportunityListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
