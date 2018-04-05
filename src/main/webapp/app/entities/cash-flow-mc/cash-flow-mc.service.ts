import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { CashFlowMc } from './cash-flow-mc.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CashFlowMc>;

@Injectable()
export class CashFlowMcService {

    private resourceUrl =  SERVER_API_URL + 'api/cash-flows';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(cashFlow: CashFlowMc): Observable<EntityResponseType> {
        const copy = this.convert(cashFlow);
        return this.http.post<CashFlowMc>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(cashFlow: CashFlowMc): Observable<EntityResponseType> {
        const copy = this.convert(cashFlow);
        return this.http.put<CashFlowMc>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CashFlowMc>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CashFlowMc[]>> {
        const options = createRequestOption(req);
        return this.http.get<CashFlowMc[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CashFlowMc[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CashFlowMc = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CashFlowMc[]>): HttpResponse<CashFlowMc[]> {
        const jsonResponse: CashFlowMc[] = res.body;
        const body: CashFlowMc[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CashFlowMc.
     */
    private convertItemFromServer(cashFlow: CashFlowMc): CashFlowMc {
        const copy: CashFlowMc = Object.assign({}, cashFlow);
        copy.datePayment = this.dateUtils
            .convertDateTimeFromServer(cashFlow.datePayment);
        return copy;
    }

    /**
     * Convert a CashFlowMc to a JSON which can be sent to the server.
     */
    private convert(cashFlow: CashFlowMc): CashFlowMc {
        const copy: CashFlowMc = Object.assign({}, cashFlow);

        copy.datePayment = this.dateUtils.toDate(cashFlow.datePayment);
        return copy;
    }
}
