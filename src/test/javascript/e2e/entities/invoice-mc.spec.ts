import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Invoice e2e test', () => {

    let navBarPage: NavBarPage;
    let invoiceDialogPage: InvoiceDialogPage;
    let invoiceComponentsPage: InvoiceComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Invoices', () => {
        navBarPage.goToEntity('invoice-mc');
        invoiceComponentsPage = new InvoiceComponentsPage();
        expect(invoiceComponentsPage.getTitle())
            .toMatch(/mcErpApp.invoice.home.title/);

    });

    it('should load create Invoice dialog', () => {
        invoiceComponentsPage.clickOnCreateButton();
        invoiceDialogPage = new InvoiceDialogPage();
        expect(invoiceDialogPage.getModalTitle())
            .toMatch(/mcErpApp.invoice.home.createOrEditLabel/);
        invoiceDialogPage.close();
    });

    it('should create and save Invoices', () => {
        invoiceComponentsPage.clickOnCreateButton();
        invoiceDialogPage.setNameInput('name');
        expect(invoiceDialogPage.getNameInput()).toMatch('name');
        invoiceDialogPage.setDateIssuedInput(12310020012301);
        expect(invoiceDialogPage.getDateIssuedInput()).toMatch('2001-12-31T02:30');
        invoiceDialogPage.setAmountTotalInput('5');
        expect(invoiceDialogPage.getAmountTotalInput()).toMatch('5');
        invoiceDialogPage.setPaymentDueInput('5');
        expect(invoiceDialogPage.getPaymentDueInput()).toMatch('5');
        invoiceDialogPage.customerOrderSelectLastOption();
        invoiceDialogPage.customerSelectLastOption();
        invoiceDialogPage.save();
        expect(invoiceDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class InvoiceComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-invoice-mc div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class InvoiceDialogPage {
    modalTitle = element(by.css('h4#myInvoiceLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    dateIssuedInput = element(by.css('input#field_dateIssued'));
    amountTotalInput = element(by.css('input#field_amountTotal'));
    paymentDueInput = element(by.css('input#field_paymentDue'));
    customerOrderSelect = element(by.css('select#field_customerOrder'));
    customerSelect = element(by.css('select#field_customer'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    };

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
    };

    setDateIssuedInput = function(dateIssued) {
        this.dateIssuedInput.sendKeys(dateIssued);
    };

    getDateIssuedInput = function() {
        return this.dateIssuedInput.getAttribute('value');
    };

    setAmountTotalInput = function(amountTotal) {
        this.amountTotalInput.sendKeys(amountTotal);
    };

    getAmountTotalInput = function() {
        return this.amountTotalInput.getAttribute('value');
    };

    setPaymentDueInput = function(paymentDue) {
        this.paymentDueInput.sendKeys(paymentDue);
    };

    getPaymentDueInput = function() {
        return this.paymentDueInput.getAttribute('value');
    };

    customerOrderSelectLastOption = function() {
        this.customerOrderSelect.all(by.tagName('option')).last().click();
    };

    customerOrderSelectOption = function(option) {
        this.customerOrderSelect.sendKeys(option);
    };

    getCustomerOrderSelect = function() {
        return this.customerOrderSelect;
    };

    getCustomerOrderSelectedOption = function() {
        return this.customerOrderSelect.element(by.css('option:checked')).getText();
    };

    customerSelectLastOption = function() {
        this.customerSelect.all(by.tagName('option')).last().click();
    };

    customerSelectOption = function(option) {
        this.customerSelect.sendKeys(option);
    };

    getCustomerSelect = function() {
        return this.customerSelect;
    };

    getCustomerSelectedOption = function() {
        return this.customerSelect.element(by.css('option:checked')).getText();
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
