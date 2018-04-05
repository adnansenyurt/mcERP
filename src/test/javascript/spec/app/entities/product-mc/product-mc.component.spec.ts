/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { McErpTestModule } from '../../../test.module';
import { ProductMcComponent } from '../../../../../../main/webapp/app/entities/product-mc/product-mc.component';
import { ProductMcService } from '../../../../../../main/webapp/app/entities/product-mc/product-mc.service';
import { ProductMc } from '../../../../../../main/webapp/app/entities/product-mc/product-mc.model';

describe('Component Tests', () => {

    describe('ProductMc Management Component', () => {
        let comp: ProductMcComponent;
        let fixture: ComponentFixture<ProductMcComponent>;
        let service: ProductMcService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [McErpTestModule],
                declarations: [ProductMcComponent],
                providers: [
                    ProductMcService
                ]
            })
            .overrideTemplate(ProductMcComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProductMcComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProductMcService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ProductMc(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.products[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
