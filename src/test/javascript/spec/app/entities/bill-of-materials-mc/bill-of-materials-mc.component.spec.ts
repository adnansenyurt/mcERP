/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { McErpTestModule } from '../../../test.module';
import { BillOfMaterialsMcComponent } from '../../../../../../main/webapp/app/entities/bill-of-materials-mc/bill-of-materials-mc.component';
import { BillOfMaterialsMcService } from '../../../../../../main/webapp/app/entities/bill-of-materials-mc/bill-of-materials-mc.service';
import { BillOfMaterialsMc } from '../../../../../../main/webapp/app/entities/bill-of-materials-mc/bill-of-materials-mc.model';

describe('Component Tests', () => {

    describe('BillOfMaterialsMc Management Component', () => {
        let comp: BillOfMaterialsMcComponent;
        let fixture: ComponentFixture<BillOfMaterialsMcComponent>;
        let service: BillOfMaterialsMcService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [McErpTestModule],
                declarations: [BillOfMaterialsMcComponent],
                providers: [
                    BillOfMaterialsMcService
                ]
            })
            .overrideTemplate(BillOfMaterialsMcComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BillOfMaterialsMcComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BillOfMaterialsMcService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new BillOfMaterialsMc(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.billOfMaterials[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
