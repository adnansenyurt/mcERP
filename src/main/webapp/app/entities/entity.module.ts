import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { McErpContactPersonMcModule } from './contact-person-mc/contact-person-mc.module';
import { McErpOpportunityMcModule } from './opportunity-mc/opportunity-mc.module';
import { McErpPurchaseOrderMcModule } from './purchase-order-mc/purchase-order-mc.module';
import { McErpCashFlowMcModule } from './cash-flow-mc/cash-flow-mc.module';
import { McErpInvoiceMcModule } from './invoice-mc/invoice-mc.module';
import { McErpCustomerProposalMcModule } from './customer-proposal-mc/customer-proposal-mc.module';
import { McErpSupplyPartContractMcModule } from './supply-part-contract-mc/supply-part-contract-mc.module';
import { McErpProductStockMcModule } from './product-stock-mc/product-stock-mc.module';
import { McErpCustomerMcModule } from './customer-mc/customer-mc.module';
import { McErpSupplierMcModule } from './supplier-mc/supplier-mc.module';
import { McErpCustomerOrderMcModule } from './customer-order-mc/customer-order-mc.module';
import { McErpProductMcModule } from './product-mc/product-mc.module';
import { McErpBillOfMaterialsMcModule } from './bill-of-materials-mc/bill-of-materials-mc.module';
import { McErpSupplierContractMcModule } from './supplier-contract-mc/supplier-contract-mc.module';
import { McErpSupplyPartMcModule } from './supply-part-mc/supply-part-mc.module';
import { McErpPriceRangeMcModule } from './price-range-mc/price-range-mc.module';
import { McErpSupplyStockMcModule } from './supply-stock-mc/supply-stock-mc.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        McErpContactPersonMcModule,
        McErpOpportunityMcModule,
        McErpPurchaseOrderMcModule,
        McErpCashFlowMcModule,
        McErpInvoiceMcModule,
        McErpCustomerProposalMcModule,
        McErpSupplyPartContractMcModule,
        McErpProductStockMcModule,
        McErpCustomerMcModule,
        McErpSupplierMcModule,
        McErpCustomerOrderMcModule,
        McErpProductMcModule,
        McErpBillOfMaterialsMcModule,
        McErpSupplierContractMcModule,
        McErpSupplyPartMcModule,
        McErpPriceRangeMcModule,
        McErpSupplyStockMcModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class McErpEntityModule {}
