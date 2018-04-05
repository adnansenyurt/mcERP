import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { PurchaseOrderMc } from './purchase-order-mc.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<PurchaseOrderMc>;

@Injectable()
export class PurchaseOrderMcService {

    private resourceUrl =  SERVER_API_URL + 'api/purchase-orders';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(purchaseOrder: PurchaseOrderMc): Observable<EntityResponseType> {
        const copy = this.convert(purchaseOrder);
        return this.http.post<PurchaseOrderMc>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(purchaseOrder: PurchaseOrderMc): Observable<EntityResponseType> {
        const copy = this.convert(purchaseOrder);
        return this.http.put<PurchaseOrderMc>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<PurchaseOrderMc>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<PurchaseOrderMc[]>> {
        const options = createRequestOption(req);
        return this.http.get<PurchaseOrderMc[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<PurchaseOrderMc[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: PurchaseOrderMc = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<PurchaseOrderMc[]>): HttpResponse<PurchaseOrderMc[]> {
        const jsonResponse: PurchaseOrderMc[] = res.body;
        const body: PurchaseOrderMc[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to PurchaseOrderMc.
     */
    private convertItemFromServer(purchaseOrder: PurchaseOrderMc): PurchaseOrderMc {
        const copy: PurchaseOrderMc = Object.assign({}, purchaseOrder);
        copy.dateOpened = this.dateUtils
            .convertDateTimeFromServer(purchaseOrder.dateOpened);
        return copy;
    }

    /**
     * Convert a PurchaseOrderMc to a JSON which can be sent to the server.
     */
    private convert(purchaseOrder: PurchaseOrderMc): PurchaseOrderMc {
        const copy: PurchaseOrderMc = Object.assign({}, purchaseOrder);

        copy.dateOpened = this.dateUtils.toDate(purchaseOrder.dateOpened);
        return copy;
    }
}
