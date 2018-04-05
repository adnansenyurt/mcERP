/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { McErpTestModule } from '../../../test.module';
import { InvoiceMcComponent } from '../../../../../../main/webapp/app/entities/invoice-mc/invoice-mc.component';
import { InvoiceMcService } from '../../../../../../main/webapp/app/entities/invoice-mc/invoice-mc.service';
import { InvoiceMc } from '../../../../../../main/webapp/app/entities/invoice-mc/invoice-mc.model';

describe('Component Tests', () => {

    describe('InvoiceMc Management Component', () => {
        let comp: InvoiceMcComponent;
        let fixture: ComponentFixture<InvoiceMcComponent>;
        let service: InvoiceMcService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [McErpTestModule],
                declarations: [InvoiceMcComponent],
                providers: [
                    InvoiceMcService
                ]
            })
            .overrideTemplate(InvoiceMcComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(InvoiceMcComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InvoiceMcService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new InvoiceMc(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.invoices[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
