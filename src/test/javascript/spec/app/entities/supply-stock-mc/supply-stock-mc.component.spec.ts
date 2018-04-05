/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { McErpTestModule } from '../../../test.module';
import { SupplyStockMcComponent } from '../../../../../../main/webapp/app/entities/supply-stock-mc/supply-stock-mc.component';
import { SupplyStockMcService } from '../../../../../../main/webapp/app/entities/supply-stock-mc/supply-stock-mc.service';
import { SupplyStockMc } from '../../../../../../main/webapp/app/entities/supply-stock-mc/supply-stock-mc.model';

describe('Component Tests', () => {

    describe('SupplyStockMc Management Component', () => {
        let comp: SupplyStockMcComponent;
        let fixture: ComponentFixture<SupplyStockMcComponent>;
        let service: SupplyStockMcService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [McErpTestModule],
                declarations: [SupplyStockMcComponent],
                providers: [
                    SupplyStockMcService
                ]
            })
            .overrideTemplate(SupplyStockMcComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SupplyStockMcComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SupplyStockMcService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new SupplyStockMc(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.supplyStocks[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
