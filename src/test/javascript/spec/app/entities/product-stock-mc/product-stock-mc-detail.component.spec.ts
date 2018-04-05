/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { McErpTestModule } from '../../../test.module';
import { ProductStockMcDetailComponent } from '../../../../../../main/webapp/app/entities/product-stock-mc/product-stock-mc-detail.component';
import { ProductStockMcService } from '../../../../../../main/webapp/app/entities/product-stock-mc/product-stock-mc.service';
import { ProductStockMc } from '../../../../../../main/webapp/app/entities/product-stock-mc/product-stock-mc.model';

describe('Component Tests', () => {

    describe('ProductStockMc Management Detail Component', () => {
        let comp: ProductStockMcDetailComponent;
        let fixture: ComponentFixture<ProductStockMcDetailComponent>;
        let service: ProductStockMcService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [McErpTestModule],
                declarations: [ProductStockMcDetailComponent],
                providers: [
                    ProductStockMcService
                ]
            })
            .overrideTemplate(ProductStockMcDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProductStockMcDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProductStockMcService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ProductStockMc(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.productStock).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
