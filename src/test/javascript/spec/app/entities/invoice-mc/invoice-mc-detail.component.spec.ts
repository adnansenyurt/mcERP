/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { McErpTestModule } from '../../../test.module';
import { InvoiceMcDetailComponent } from '../../../../../../main/webapp/app/entities/invoice-mc/invoice-mc-detail.component';
import { InvoiceMcService } from '../../../../../../main/webapp/app/entities/invoice-mc/invoice-mc.service';
import { InvoiceMc } from '../../../../../../main/webapp/app/entities/invoice-mc/invoice-mc.model';

describe('Component Tests', () => {

    describe('InvoiceMc Management Detail Component', () => {
        let comp: InvoiceMcDetailComponent;
        let fixture: ComponentFixture<InvoiceMcDetailComponent>;
        let service: InvoiceMcService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [McErpTestModule],
                declarations: [InvoiceMcDetailComponent],
                providers: [
                    InvoiceMcService
                ]
            })
            .overrideTemplate(InvoiceMcDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(InvoiceMcDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InvoiceMcService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new InvoiceMc(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.invoice).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
