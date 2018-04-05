import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Customer e2e test', () => {

    let navBarPage: NavBarPage;
    let customerDialogPage: CustomerDialogPage;
    let customerComponentsPage: CustomerComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Customers', () => {
        navBarPage.goToEntity('customer-mc');
        customerComponentsPage = new CustomerComponentsPage();
        expect(customerComponentsPage.getTitle())
            .toMatch(/mcErpApp.customer.home.title/);

    });

    it('should load create Customer dialog', () => {
        customerComponentsPage.clickOnCreateButton();
        customerDialogPage = new CustomerDialogPage();
        expect(customerDialogPage.getModalTitle())
            .toMatch(/mcErpApp.customer.home.createOrEditLabel/);
        customerDialogPage.close();
    });

    it('should create and save Customers', () => {
        customerComponentsPage.clickOnCreateButton();
        customerDialogPage.setNameInput('name');
        expect(customerDialogPage.getNameInput()).toMatch('name');
        customerDialogPage.setAddressInput('address');
        expect(customerDialogPage.getAddressInput()).toMatch('address');
        customerDialogPage.setPhoneInput('phone');
        expect(customerDialogPage.getPhoneInput()).toMatch('phone');
        customerDialogPage.setAccountNoInput('accountNo');
        expect(customerDialogPage.getAccountNoInput()).toMatch('accountNo');
        customerDialogPage.contactPersonSelectLastOption();
        customerDialogPage.opportunitySelectLastOption();
        customerDialogPage.customerOrderSelectLastOption();
        customerDialogPage.invoiceSelectLastOption();
        customerDialogPage.customerProposalSelectLastOption();
        customerDialogPage.save();
        expect(customerDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class CustomerComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-customer-mc div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class CustomerDialogPage {
    modalTitle = element(by.css('h4#myCustomerLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    addressInput = element(by.css('input#field_address'));
    phoneInput = element(by.css('input#field_phone'));
    accountNoInput = element(by.css('input#field_accountNo'));
    contactPersonSelect = element(by.css('select#field_contactPerson'));
    opportunitySelect = element(by.css('select#field_opportunity'));
    customerOrderSelect = element(by.css('select#field_customerOrder'));
    invoiceSelect = element(by.css('select#field_invoice'));
    customerProposalSelect = element(by.css('select#field_customerProposal'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    };

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
    };

    setAddressInput = function(address) {
        this.addressInput.sendKeys(address);
    };

    getAddressInput = function() {
        return this.addressInput.getAttribute('value');
    };

    setPhoneInput = function(phone) {
        this.phoneInput.sendKeys(phone);
    };

    getPhoneInput = function() {
        return this.phoneInput.getAttribute('value');
    };

    setAccountNoInput = function(accountNo) {
        this.accountNoInput.sendKeys(accountNo);
    };

    getAccountNoInput = function() {
        return this.accountNoInput.getAttribute('value');
    };

    contactPersonSelectLastOption = function() {
        this.contactPersonSelect.all(by.tagName('option')).last().click();
    };

    contactPersonSelectOption = function(option) {
        this.contactPersonSelect.sendKeys(option);
    };

    getContactPersonSelect = function() {
        return this.contactPersonSelect;
    };

    getContactPersonSelectedOption = function() {
        return this.contactPersonSelect.element(by.css('option:checked')).getText();
    };

    opportunitySelectLastOption = function() {
        this.opportunitySelect.all(by.tagName('option')).last().click();
    };

    opportunitySelectOption = function(option) {
        this.opportunitySelect.sendKeys(option);
    };

    getOpportunitySelect = function() {
        return this.opportunitySelect;
    };

    getOpportunitySelectedOption = function() {
        return this.opportunitySelect.element(by.css('option:checked')).getText();
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

    invoiceSelectLastOption = function() {
        this.invoiceSelect.all(by.tagName('option')).last().click();
    };

    invoiceSelectOption = function(option) {
        this.invoiceSelect.sendKeys(option);
    };

    getInvoiceSelect = function() {
        return this.invoiceSelect;
    };

    getInvoiceSelectedOption = function() {
        return this.invoiceSelect.element(by.css('option:checked')).getText();
    };

    customerProposalSelectLastOption = function() {
        this.customerProposalSelect.all(by.tagName('option')).last().click();
    };

    customerProposalSelectOption = function(option) {
        this.customerProposalSelect.sendKeys(option);
    };

    getCustomerProposalSelect = function() {
        return this.customerProposalSelect;
    };

    getCustomerProposalSelectedOption = function() {
        return this.customerProposalSelect.element(by.css('option:checked')).getText();
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
