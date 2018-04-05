/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { McErpTestModule } from '../../../test.module';
import { CustomerProposalMcDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/customer-proposal-mc/customer-proposal-mc-delete-dialog.component';
import { CustomerProposalMcService } from '../../../../../../main/webapp/app/entities/customer-proposal-mc/customer-proposal-mc.service';

describe('Component Tests', () => {

    describe('CustomerProposalMc Management Delete Component', () => {
        let comp: CustomerProposalMcDeleteDialogComponent;
        let fixture: ComponentFixture<CustomerProposalMcDeleteDialogComponent>;
        let service: CustomerProposalMcService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [McErpTestModule],
                declarations: [CustomerProposalMcDeleteDialogComponent],
                providers: [
                    CustomerProposalMcService
                ]
            })
            .overrideTemplate(CustomerProposalMcDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CustomerProposalMcDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CustomerProposalMcService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
