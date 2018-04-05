/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { McErpTestModule } from '../../../test.module';
import { ContactPersonMcComponent } from '../../../../../../main/webapp/app/entities/contact-person-mc/contact-person-mc.component';
import { ContactPersonMcService } from '../../../../../../main/webapp/app/entities/contact-person-mc/contact-person-mc.service';
import { ContactPersonMc } from '../../../../../../main/webapp/app/entities/contact-person-mc/contact-person-mc.model';

describe('Component Tests', () => {

    describe('ContactPersonMc Management Component', () => {
        let comp: ContactPersonMcComponent;
        let fixture: ComponentFixture<ContactPersonMcComponent>;
        let service: ContactPersonMcService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [McErpTestModule],
                declarations: [ContactPersonMcComponent],
                providers: [
                    ContactPersonMcService
                ]
            })
            .overrideTemplate(ContactPersonMcComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ContactPersonMcComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ContactPersonMcService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ContactPersonMc(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.contactPeople[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
