/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { McErpTestModule } from '../../../test.module';
import { SupplyStockMcDetailComponent } from '../../../../../../main/webapp/app/entities/supply-stock-mc/supply-stock-mc-detail.component';
import { SupplyStockMcService } from '../../../../../../main/webapp/app/entities/supply-stock-mc/supply-stock-mc.service';
import { SupplyStockMc } from '../../../../../../main/webapp/app/entities/supply-stock-mc/supply-stock-mc.model';

describe('Component Tests', () => {

    describe('SupplyStockMc Management Detail Component', () => {
        let comp: SupplyStockMcDetailComponent;
        let fixture: ComponentFixture<SupplyStockMcDetailComponent>;
        let service: SupplyStockMcService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [McErpTestModule],
                declarations: [SupplyStockMcDetailComponent],
                providers: [
                    SupplyStockMcService
                ]
            })
            .overrideTemplate(SupplyStockMcDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SupplyStockMcDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SupplyStockMcService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new SupplyStockMc(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.supplyStock).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
