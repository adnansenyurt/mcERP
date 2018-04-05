import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('CustomerOrder e2e test', () => {

    let navBarPage: NavBarPage;
    let customerOrderDialogPage: CustomerOrderDialogPage;
    let customerOrderComponentsPage: CustomerOrderComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load CustomerOrders', () => {
        navBarPage.goToEntity('customer-order-mc');
        customerOrderComponentsPage = new CustomerOrderComponentsPage();
        expect(customerOrderComponentsPage.getTitle())
            .toMatch(/mcErpApp.customerOrder.home.title/);

    });

    it('should load create CustomerOrder dialog', () => {
        customerOrderComponentsPage.clickOnCreateButton();
        customerOrderDialogPage = new CustomerOrderDialogPage();
        expect(customerOrderDialogPage.getModalTitle())
            .toMatch(/mcErpApp.customerOrder.home.createOrEditLabel/);
        customerOrderDialogPage.close();
    });

    it('should create and save CustomerOrders', () => {
        customerOrderComponentsPage.clickOnCreateButton();
        customerOrderDialogPage.setNameInput('name');
        expect(customerOrderDialogPage.getNameInput()).toMatch('name');
        customerOrderDialogPage.setDateOpenedInput(12310020012301);
        expect(customerOrderDialogPage.getDateOpenedInput()).toMatch('2001-12-31T02:30');
        customerOrderDialogPage.setDatePaymentDueInput(12310020012301);
        expect(customerOrderDialogPage.getDatePaymentDueInput()).toMatch('2001-12-31T02:30');
        customerOrderDialogPage.setAmountInput('5');
        expect(customerOrderDialogPage.getAmountInput()).toMatch('5');
        customerOrderDialogPage.currentStatusSelectLastOption();
        customerOrderDialogPage.cashFlowSelectLastOption();
        customerOrderDialogPage.save();
        expect(customerOrderDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class CustomerOrderComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-customer-order-mc div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class CustomerOrderDialogPage {
    modalTitle = element(by.css('h4#myCustomerOrderLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    dateOpenedInput = element(by.css('input#field_dateOpened'));
    datePaymentDueInput = element(by.css('input#field_datePaymentDue'));
    amountInput = element(by.css('input#field_amount'));
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

    setDatePaymentDueInput = function(datePaymentDue) {
        this.datePaymentDueInput.sendKeys(datePaymentDue);
    };

    getDatePaymentDueInput = function() {
        return this.datePaymentDueInput.getAttribute('value');
    };

    setAmountInput = function(amount) {
        this.amountInput.sendKeys(amount);
    };

    getAmountInput = function() {
        return this.amountInput.getAttribute('value');
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
