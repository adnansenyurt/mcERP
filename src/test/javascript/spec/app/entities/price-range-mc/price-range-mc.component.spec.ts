/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { McErpTestModule } from '../../../test.module';
import { PriceRangeMcComponent } from '../../../../../../main/webapp/app/entities/price-range-mc/price-range-mc.component';
import { PriceRangeMcService } from '../../../../../../main/webapp/app/entities/price-range-mc/price-range-mc.service';
import { PriceRangeMc } from '../../../../../../main/webapp/app/entities/price-range-mc/price-range-mc.model';

describe('Component Tests', () => {

    describe('PriceRangeMc Management Component', () => {
        let comp: PriceRangeMcComponent;
        let fixture: ComponentFixture<PriceRangeMcComponent>;
        let service: PriceRangeMcService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [McErpTestModule],
                declarations: [PriceRangeMcComponent],
                providers: [
                    PriceRangeMcService
                ]
            })
            .overrideTemplate(PriceRangeMcComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PriceRangeMcComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PriceRangeMcService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new PriceRangeMc(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.priceRanges[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
