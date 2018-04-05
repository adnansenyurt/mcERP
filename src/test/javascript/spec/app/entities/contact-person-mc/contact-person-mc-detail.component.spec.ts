/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { McErpTestModule } from '../../../test.module';
import { ContactPersonMcDetailComponent } from '../../../../../../main/webapp/app/entities/contact-person-mc/contact-person-mc-detail.component';
import { ContactPersonMcService } from '../../../../../../main/webapp/app/entities/contact-person-mc/contact-person-mc.service';
import { ContactPersonMc } from '../../../../../../main/webapp/app/entities/contact-person-mc/contact-person-mc.model';

describe('Component Tests', () => {

    describe('ContactPersonMc Management Detail Component', () => {
        let comp: ContactPersonMcDetailComponent;
        let fixture: ComponentFixture<ContactPersonMcDetailComponent>;
        let service: ContactPersonMcService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [McErpTestModule],
                declarations: [ContactPersonMcDetailComponent],
                providers: [
                    ContactPersonMcService
                ]
            })
            .overrideTemplate(ContactPersonMcDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ContactPersonMcDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ContactPersonMcService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ContactPersonMc(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.contactPerson).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
