/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { McErpTestModule } from '../../../test.module';
import { PurchaseOrderMcDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/purchase-order-mc/purchase-order-mc-delete-dialog.component';
import { PurchaseOrderMcService } from '../../../../../../main/webapp/app/entities/purchase-order-mc/purchase-order-mc.service';

describe('Component Tests', () => {

    describe('PurchaseOrderMc Management Delete Component', () => {
        let comp: PurchaseOrderMcDeleteDialogComponent;
        let fixture: ComponentFixture<PurchaseOrderMcDeleteDialogComponent>;
        let service: PurchaseOrderMcService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [McErpTestModule],
                declarations: [PurchaseOrderMcDeleteDialogComponent],
                providers: [
                    PurchaseOrderMcService
                ]
            })
            .overrideTemplate(PurchaseOrderMcDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PurchaseOrderMcDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PurchaseOrderMcService);
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
