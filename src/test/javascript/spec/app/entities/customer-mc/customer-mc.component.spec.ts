/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { McErpTestModule } from '../../../test.module';
import { CustomerMcComponent } from '../../../../../../main/webapp/app/entities/customer-mc/customer-mc.component';
import { CustomerMcService } from '../../../../../../main/webapp/app/entities/customer-mc/customer-mc.service';
import { CustomerMc } from '../../../../../../main/webapp/app/entities/customer-mc/customer-mc.model';

describe('Component Tests', () => {

    describe('CustomerMc Management Component', () => {
        let comp: CustomerMcComponent;
        let fixture: ComponentFixture<CustomerMcComponent>;
        let service: CustomerMcService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [McErpTestModule],
                declarations: [CustomerMcComponent],
                providers: [
                    CustomerMcService
                ]
            })
            .overrideTemplate(CustomerMcComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CustomerMcComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CustomerMcService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new CustomerMc(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.customers[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
