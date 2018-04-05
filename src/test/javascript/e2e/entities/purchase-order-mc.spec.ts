import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('PurchaseOrder e2e test', () => {

    let navBarPage: NavBarPage;
    let purchaseOrderDialogPage: PurchaseOrderDialogPage;
    let purchaseOrderComponentsPage: PurchaseOrderComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load PurchaseOrders', () => {
        navBarPage.goToEntity('purchase-order-mc');
        purchaseOrderComponentsPage = new PurchaseOrderComponentsPage();
        expect(purchaseOrderComponentsPage.getTitle())
            .toMatch(/mcErpApp.purchaseOrder.home.title/);

    });

    it('should load create PurchaseOrder dialog', () => {
        purchaseOrderComponentsPage.clickOnCreateButton();
        purchaseOrderDialogPage = new PurchaseOrderDialogPage();
        expect(purchaseOrderDialogPage.getModalTitle())
            .toMatch(/mcErpApp.purchaseOrder.home.createOrEditLabel/);
        purchaseOrderDialogPage.close();
    });

    it('should create and save PurchaseOrders', () => {
        purchaseOrderComponentsPage.clickOnCreateButton();
        purchaseOrderDialogPage.setNameInput('name');
        expect(purchaseOrderDialogPage.getNameInput()).toMatch('name');
        purchaseOrderDialogPage.setDateOpenedInput(12310020012301);
        expect(purchaseOrderDialogPage.getDateOpenedInput()).toMatch('2001-12-31T02:30');
        purchaseOrderDialogPage.setAmountInput('5');
        expect(purchaseOrderDialogPage.getAmountInput()).toMatch('5');
        purchaseOrderDialogPage.setCostCenterInput('costCenter');
        expect(purchaseOrderDialogPage.getCostCenterInput()).toMatch('costCenter');
        purchaseOrderDialogPage.setPaymentConditionsInput('paymentConditions');
        expect(purchaseOrderDialogPage.getPaymentConditionsInput()).toMatch('paymentConditions');
        purchaseOrderDialogPage.currentStatusSelectLastOption();
        purchaseOrderDialogPage.cashFlowSelectLastOption();
        purchaseOrderDialogPage.save();
        expect(purchaseOrderDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class PurchaseOrderComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-purchase-order-mc div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class PurchaseOrderDialogPage {
    modalTitle = element(by.css('h4#myPurchaseOrderLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    dateOpenedInput = element(by.css('input#field_dateOpened'));
    amountInput = element(by.css('input#field_amount'));
    costCenterInput = element(by.css('input#field_costCenter'));
    paymentConditionsInput = element(by.css('input#field_paymentConditions'));
    currentStatusSelect = element(by.css('select#field_currentStatus'));
    cashFlowSelect = element(by.css('select#field_cashFlow'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    };

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
    };

    setDateOpenedInput = function(dateOpened) {
        this.dateOpenedInput.sendKeys(dateOpened);
    };

    getDateOpenedInput = function() {
        return this.dateOpenedInput.getAttribute('value');
    };

    setAmountInput = function(amount) {
        this.amountInput.sendKeys(amount);
    };

    getAmountInput = function() {
        return this.amountInput.getAttribute('value');
    };

    setCostCenterInput = function(costCenter) {
        this.costCenterInput.sendKeys(costCenter);
    };

    getCostCenterInput = function() {
        return this.costCenterInput.getAttribute('value');
    };

    setPaymentConditionsInput = function(paymentConditions) {
        this.paymentConditionsInput.sendKeys(paymentConditions);
    };

    getPaymentConditionsInput = function() {
        return this.paymentConditionsInput.getAttribute('value');
    };

    setCurrentStatusSelect = function(currentStatus) {
        this.currentStatusSelect.sendKeys(currentStatus);
    };

    getCurrentStatusSelect = function() {
        return this.currentStatusSelect.element(by.css('option:checked')).getText();
    };

    currentStatusSelectLastOption = function() {
        this.currentStatusSelect.all(by.tagName('option')).last().click();
    };
    cashFlowSelectLastOption = function() {
        this.cashFlowSelect.all(by.tagName('option')).last().click();
    };

    cashFlowSelectOption = function(option) {
        this.cashFlowSelect.sendKeys(option);
    };

    getCashFlowSelect = function() {
        return this.cashFlowSelect;
    };

    getCashFlowSelectedOption = function() {
        return this.cashFlowSelect.element(by.css('option:checked')).getText();
    };

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
