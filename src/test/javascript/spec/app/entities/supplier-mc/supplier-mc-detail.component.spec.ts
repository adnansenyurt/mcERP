/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { McErpTestModule } from '../../../test.module';
import { SupplierMcDetailComponent } from '../../../../../../main/webapp/app/entities/supplier-mc/supplier-mc-detail.component';
import { SupplierMcService } from '../../../../../../main/webapp/app/entities/supplier-mc/supplier-mc.service';
import { SupplierMc } from '../../../../../../main/webapp/app/entities/supplier-mc/supplier-mc.model';

describe('Component Tests', () => {

    describe('SupplierMc Management Detail Component', () => {
        let comp: SupplierMcDetailComponent;
        let fixture: ComponentFixture<SupplierMcDetailComponent>;
        let service: SupplierMcService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [McErpTestModule],
                declarations: [SupplierMcDetailComponent],
                providers: [
                    SupplierMcService
                ]
            })
            .overrideTemplate(SupplierMcDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SupplierMcDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SupplierMcService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new SupplierMc(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.supplier).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
