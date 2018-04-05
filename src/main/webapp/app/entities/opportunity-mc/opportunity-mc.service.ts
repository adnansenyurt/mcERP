import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { OpportunityMc } from './opportunity-mc.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<OpportunityMc>;

@Injectable()
export class OpportunityMcService {

    private resourceUrl =  SERVER_API_URL + 'api/opportunities';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(opportunity: OpportunityMc): Observable<EntityResponseType> {
        const copy = this.convert(opportunity);
        return this.http.post<OpportunityMc>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(opportunity: OpportunityMc): Observable<EntityResponseType> {
        const copy = this.convert(opportunity);
        return this.http.put<OpportunityMc>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<OpportunityMc>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<OpportunityMc[]>> {
        const options = createRequestOption(req);
        return this.http.get<OpportunityMc[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<OpportunityMc[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: OpportunityMc = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<OpportunityMc[]>): HttpResponse<OpportunityMc[]> {
        const jsonResponse: OpportunityMc[] = res.body;
        const body: OpportunityMc[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to OpportunityMc.
     */
    private convertItemFromServer(opportunity: OpportunityMc): OpportunityMc {
        const copy: OpportunityMc = Object.assign({}, opportunity);
        copy.dateOpened = this.dateUtils
            .convertDateTimeFromServer(opportunity.dateOpened);
        return copy;
    }

    /**
     * Convert a OpportunityMc to a JSON which can be sent to the server.
     */
    private convert(opportunity: OpportunityMc): OpportunityMc {
        const copy: OpportunityMc = Object.assign({}, opportunity);

        copy.dateOpened = this.dateUtils.toDate(opportunity.dateOpened);
        return copy;
    }
}
