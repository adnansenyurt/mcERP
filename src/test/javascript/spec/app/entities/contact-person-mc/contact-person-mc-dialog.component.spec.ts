/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { McErpTestModule } from '../../../test.module';
import { ContactPersonMcDialogComponent } from '../../../../../../main/webapp/app/entities/contact-person-mc/contact-person-mc-dialog.component';
import { ContactPersonMcService } from '../../../../../../main/webapp/app/entities/contact-person-mc/contact-person-mc.service';
import { ContactPersonMc } from '../../../../../../main/webapp/app/entities/contact-person-mc/contact-person-mc.model';
import { CustomerMcService } from '../../../../../../main/webapp/app/entities/customer-mc';
import { SupplierMcService } from '../../../../../../main/webapp/app/entities/supplier-mc';

describe('Component Tests', () => {

    describe('ContactPersonMc Management Dialog Component', () => {
        let comp: ContactPersonMcDialogComponent;
        let fixture: ComponentFixture<ContactPersonMcDialogComponent>;
        let service: ContactPersonMcService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [McErpTestModule],
                declarations: [ContactPersonMcDialogComponent],
                providers: [
                    CustomerMcService,
                    SupplierMcService,
                    ContactPersonMcService
                ]
            })
            .overrideTemplate(ContactPersonMcDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ContactPersonMcDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ContactPersonMcService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ContactPersonMc(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.contactPerson = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'contactPersonListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ContactPersonMc();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.contactPerson = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'contactPersonListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
