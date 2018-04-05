import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { SupplyPartMc } from './supply-part-mc.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<SupplyPartMc>;

@Injectable()
export class SupplyPartMcService {

    private resourceUrl =  SERVER_API_URL + 'api/supply-parts';

    constructor(private http: HttpClient) { }

    create(supplyPart: SupplyPartMc): Observable<EntityResponseType> {
        const copy = this.convert(supplyPart);
        return this.http.post<SupplyPartMc>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(supplyPart: SupplyPartMc): Observable<EntityResponseType> {
        const copy = this.convert(supplyPart);
        return this.http.put<SupplyPartMc>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<SupplyPartMc>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<SupplyPartMc[]>> {
        const options = createRequestOption(req);
        return this.http.get<SupplyPartMc[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<SupplyPartMc[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: SupplyPartMc = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<SupplyPartMc[]>): HttpResponse<SupplyPartMc[]> {
        const jsonResponse: SupplyPartMc[] = res.body;
        const body: SupplyPartMc[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to SupplyPartMc.
     */
    private convertItemFromServer(supplyPart: SupplyPartMc): SupplyPartMc {
        const copy: SupplyPartMc = Object.assign({}, supplyPart);
        return copy;
    }

    /**
     * Convert a SupplyPartMc to a JSON which can be sent to the server.
     */
    private convert(supplyPart: SupplyPartMc): SupplyPartMc {
        const copy: SupplyPartMc = Object.assign({}, supplyPart);
        return copy;
    }
}
