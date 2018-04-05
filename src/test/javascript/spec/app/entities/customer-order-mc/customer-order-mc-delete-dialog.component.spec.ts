/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { McErpTestModule } from '../../../test.module';
import { CustomerOrderMcDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/customer-order-mc/customer-order-mc-delete-dialog.component';
import { CustomerOrderMcService } from '../../../../../../main/webapp/app/entities/customer-order-mc/customer-order-mc.service';

describe('Component Tests', () => {

    describe('CustomerOrderMc Management Delete Component', () => {
        let comp: CustomerOrderMcDeleteDialogComponent;
        let fixture: ComponentFixture<CustomerOrderMcDeleteDialogComponent>;
        let service: CustomerOrderMcService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [McErpTestModule],
                declarations: [CustomerOrderMcDeleteDialogComponent],
                providers: [
                    CustomerOrderMcService
                ]
            })
            .overrideTemplate(CustomerOrderMcDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CustomerOrderMcDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CustomerOrderMcService);
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
