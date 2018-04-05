import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { PriceRangeMc } from './price-range-mc.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<PriceRangeMc>;

@Injectable()
export class PriceRangeMcService {

    private resourceUrl =  SERVER_API_URL + 'api/price-ranges';

    constructor(private http: HttpClient) { }

    create(priceRange: PriceRangeMc): Observable<EntityResponseType> {
        const copy = this.convert(priceRange);
        return this.http.post<PriceRangeMc>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(priceRange: PriceRangeMc): Observable<EntityResponseType> {
        const copy = this.convert(priceRange);
        return this.http.put<PriceRangeMc>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<PriceRangeMc>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<PriceRangeMc[]>> {
        const options = createRequestOption(req);
        return this.http.get<PriceRangeMc[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<PriceRangeMc[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: PriceRangeMc = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<PriceRangeMc[]>): HttpResponse<PriceRangeMc[]> {
        const jsonResponse: PriceRangeMc[] = res.body;
        const body: PriceRangeMc[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to PriceRangeMc.
     */
    private convertItemFromServer(priceRange: PriceRangeMc): PriceRangeMc {
        const copy: PriceRangeMc = Object.assign({}, priceRange);
        return copy;
    }

    /**
     * Convert a PriceRangeMc to a JSON which can be sent to the server.
     */
    private convert(priceRange: PriceRangeMc): PriceRangeMc {
        const copy: PriceRangeMc = Object.assign({}, priceRange);
        return copy;
    }
}
