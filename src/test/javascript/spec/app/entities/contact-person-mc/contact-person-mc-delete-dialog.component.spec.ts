/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { McErpTestModule } from '../../../test.module';
import { ContactPersonMcDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/contact-person-mc/contact-person-mc-delete-dialog.component';
import { ContactPersonMcService } from '../../../../../../main/webapp/app/entities/contact-person-mc/contact-person-mc.service';

describe('Component Tests', () => {

    describe('ContactPersonMc Management Delete Component', () => {
        let comp: ContactPersonMcDeleteDialogComponent;
        let fixture: ComponentFixture<ContactPersonMcDeleteDialogComponent>;
        let service: ContactPersonMcService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [McErpTestModule],
                declarations: [ContactPersonMcDeleteDialogComponent],
                providers: [
                    ContactPersonMcService
                ]
            })
            .overrideTemplate(ContactPersonMcDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ContactPersonMcDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ContactPersonMcService);
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
