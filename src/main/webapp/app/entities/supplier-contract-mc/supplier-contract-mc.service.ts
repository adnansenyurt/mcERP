import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { SupplierContractMc } from './supplier-contract-mc.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<SupplierContractMc>;

@Injectable()
export class SupplierContractMcService {

    private resourceUrl =  SERVER_API_URL + 'api/supplier-contracts';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(supplierContract: SupplierContractMc): Observable<EntityResponseType> {
        const copy = this.convert(supplierContract);
        return this.http.post<SupplierContractMc>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(supplierContract: SupplierContractMc): Observable<EntityResponseType> {
        const copy = this.convert(supplierContract);
        return this.http.put<SupplierContractMc>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<SupplierContractMc>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<SupplierContractMc[]>> {
        const options = createRequestOption(req);
        return this.http.get<SupplierContractMc[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<SupplierContractMc[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: SupplierContractMc = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<SupplierContractMc[]>): HttpResponse<SupplierContractMc[]> {
        const jsonResponse: SupplierContractMc[] = res.body;
        const body: SupplierContractMc[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to SupplierContractMc.
     */
    private convertItemFromServer(supplierContract: SupplierContractMc): SupplierContractMc {
        const copy: SupplierContractMc = Object.assign({}, supplierContract);
        copy.dateSigned = this.dateUtils
            .convertDateTimeFromServer(supplierContract.dateSigned);
        return copy;
    }

    /**
     * Convert a SupplierContractMc to a JSON which can be sent to the server.
     */
    private convert(supplierContract: SupplierContractMc): SupplierContractMc {
        const copy: SupplierContractMc = Object.assign({}, supplierContract);

        copy.dateSigned = this.dateUtils.toDate(supplierContract.dateSigned);
        return copy;
    }
}
