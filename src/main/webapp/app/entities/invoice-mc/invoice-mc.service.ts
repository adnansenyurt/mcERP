import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { InvoiceMc } from './invoice-mc.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<InvoiceMc>;

@Injectable()
export class InvoiceMcService {

    private resourceUrl =  SERVER_API_URL + 'api/invoices';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(invoice: InvoiceMc): Observable<EntityResponseType> {
        const copy = this.convert(invoice);
        return this.http.post<InvoiceMc>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(invoice: InvoiceMc): Observable<EntityResponseType> {
        const copy = this.convert(invoice);
        return this.http.put<InvoiceMc>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<InvoiceMc>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<InvoiceMc[]>> {
        const options = createRequestOption(req);
        return this.http.get<InvoiceMc[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<InvoiceMc[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: InvoiceMc = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<InvoiceMc[]>): HttpResponse<InvoiceMc[]> {
        const jsonResponse: InvoiceMc[] = res.body;
        const body: InvoiceMc[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to InvoiceMc.
     */
    private convertItemFromServer(invoice: InvoiceMc): InvoiceMc {
        const copy: InvoiceMc = Object.assign({}, invoice);
        copy.dateIssued = this.dateUtils
            .convertDateTimeFromServer(invoice.dateIssued);
        return copy;
    }

    /**
     * Convert a InvoiceMc to a JSON which can be sent to the server.
     */
    private convert(invoice: InvoiceMc): InvoiceMc {
        const copy: InvoiceMc = Object.assign({}, invoice);

        copy.dateIssued = this.dateUtils.toDate(invoice.dateIssued);
        return copy;
    }
}
