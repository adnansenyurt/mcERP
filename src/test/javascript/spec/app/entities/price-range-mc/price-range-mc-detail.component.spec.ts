/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { McErpTestModule } from '../../../test.module';
import { PriceRangeMcDetailComponent } from '../../../../../../main/webapp/app/entities/price-range-mc/price-range-mc-detail.component';
import { PriceRangeMcService } from '../../../../../../main/webapp/app/entities/price-range-mc/price-range-mc.service';
import { PriceRangeMc } from '../../../../../../main/webapp/app/entities/price-range-mc/price-range-mc.model';

describe('Component Tests', () => {

    describe('PriceRangeMc Management Detail Component', () => {
        let comp: PriceRangeMcDetailComponent;
        let fixture: ComponentFixture<PriceRangeMcDetailComponent>;
        let service: PriceRangeMcService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [McErpTestModule],
                declarations: [PriceRangeMcDetailComponent],
                providers: [
                    PriceRangeMcService
                ]
            })
            .overrideTemplate(PriceRangeMcDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PriceRangeMcDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PriceRangeMcService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new PriceRangeMc(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.priceRange).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
