import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { SupplyPartContractMc } from './supply-part-contract-mc.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<SupplyPartContractMc>;

@Injectable()
export class SupplyPartContractMcService {

    private resourceUrl =  SERVER_API_URL + 'api/supply-part-contracts';

    constructor(private http: HttpClient) { }

    create(supplyPartContract: SupplyPartContractMc): Observable<EntityResponseType> {
        const copy = this.convert(supplyPartContract);
        return this.http.post<SupplyPartContractMc>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(supplyPartContract: SupplyPartContractMc): Observable<EntityResponseType> {
        const copy = this.convert(supplyPartContract);
        return this.http.put<SupplyPartContractMc>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<SupplyPartContractMc>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<SupplyPartContractMc[]>> {
        const options = createRequestOption(req);
        return this.http.get<SupplyPartContractMc[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<SupplyPartContractMc[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: SupplyPartContractMc = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<SupplyPartContractMc[]>): HttpResponse<SupplyPartContractMc[]> {
        const jsonResponse: SupplyPartContractMc[] = res.body;
        const body: SupplyPartContractMc[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to SupplyPartContractMc.
     */
    private convertItemFromServer(supplyPartContract: SupplyPartContractMc): SupplyPartContractMc {
        const copy: SupplyPartContractMc = Object.assign({}, supplyPartContract);
        return copy;
    }

    /**
     * Convert a SupplyPartContractMc to a JSON which can be sent to the server.
     */
    private convert(supplyPartContract: SupplyPartContractMc): SupplyPartContractMc {
        const copy: SupplyPartContractMc = Object.assign({}, supplyPartContract);
        return copy;
    }
}
