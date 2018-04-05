/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { McErpTestModule } from '../../../test.module';
import { ProductStockMcComponent } from '../../../../../../main/webapp/app/entities/product-stock-mc/product-stock-mc.component';
import { ProductStockMcService } from '../../../../../../main/webapp/app/entities/product-stock-mc/product-stock-mc.service';
import { ProductStockMc } from '../../../../../../main/webapp/app/entities/product-stock-mc/product-stock-mc.model';

describe('Component Tests', () => {

    describe('ProductStockMc Management Component', () => {
        let comp: ProductStockMcComponent;
        let fixture: ComponentFixture<ProductStockMcComponent>;
        let service: ProductStockMcService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [McErpTestModule],
                declarations: [ProductStockMcComponent],
                providers: [
                    ProductStockMcService
                ]
            })
            .overrideTemplate(ProductStockMcComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProductStockMcComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProductStockMcService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ProductStockMc(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.productStocks[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
