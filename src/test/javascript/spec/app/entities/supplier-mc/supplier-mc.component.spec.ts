/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { McErpTestModule } from '../../../test.module';
import { SupplierMcComponent } from '../../../../../../main/webapp/app/entities/supplier-mc/supplier-mc.component';
import { SupplierMcService } from '../../../../../../main/webapp/app/entities/supplier-mc/supplier-mc.service';
import { SupplierMc } from '../../../../../../main/webapp/app/entities/supplier-mc/supplier-mc.model';

describe('Component Tests', () => {

    describe('SupplierMc Management Component', () => {
        let comp: SupplierMcComponent;
        let fixture: ComponentFixture<SupplierMcComponent>;
        let service: SupplierMcService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [McErpTestModule],
                declarations: [SupplierMcComponent],
                providers: [
                    SupplierMcService
                ]
            })
            .overrideTemplate(SupplierMcComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SupplierMcComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SupplierMcService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new SupplierMc(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.suppliers[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
