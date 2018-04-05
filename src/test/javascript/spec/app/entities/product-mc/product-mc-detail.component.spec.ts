/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { McErpTestModule } from '../../../test.module';
import { ProductMcDetailComponent } from '../../../../../../main/webapp/app/entities/product-mc/product-mc-detail.component';
import { ProductMcService } from '../../../../../../main/webapp/app/entities/product-mc/product-mc.service';
import { ProductMc } from '../../../../../../main/webapp/app/entities/product-mc/product-mc.model';

describe('Component Tests', () => {

    describe('ProductMc Management Detail Component', () => {
        let comp: ProductMcDetailComponent;
        let fixture: ComponentFixture<ProductMcDetailComponent>;
        let service: ProductMcService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [McErpTestModule],
                declarations: [ProductMcDetailComponent],
                providers: [
                    ProductMcService
                ]
            })
            .overrideTemplate(ProductMcDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProductMcDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProductMcService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ProductMc(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.product).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
