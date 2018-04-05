import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Supplier e2e test', () => {

    let navBarPage: NavBarPage;
    let supplierDialogPage: SupplierDialogPage;
    let supplierComponentsPage: SupplierComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Suppliers', () => {
        navBarPage.goToEntity('supplier-mc');
        supplierComponentsPage = new SupplierComponentsPage();
        expect(supplierComponentsPage.getTitle())
            .toMatch(/mcErpApp.supplier.home.title/);

    });

    it('should load create Supplier dialog', () => {
        supplierComponentsPage.clickOnCreateButton();
        supplierDialogPage = new SupplierDialogPage();
        expect(supplierDialogPage.getModalTitle())
            .toMatch(/mcErpApp.supplier.home.createOrEditLabel/);
        supplierDialogPage.close();
    });

    it('should create and save Suppliers', () => {
        supplierComponentsPage.clickOnCreateButton();
        supplierDialogPage.setNameInput('name');
        expect(supplierDialogPage.getNameInput()).toMatch('name');
        supplierDialogPage.setAddressInput('address');
        expect(supplierDialogPage.getAddressInput()).toMatch('address');
        supplierDialogPage.setDomainInput('domain');
        expect(supplierDialogPage.getDomainInput()).toMatch('domain');
        supplierDialogPage.setWebInput('web');
        expect(supplierDialogPage.getWebInput()).toMatch('web');
        supplierDialogPage.setPhoneInput('phone');
        expect(supplierDialogPage.getPhoneInput()).toMatch('phone');
        supplierDialogPage.setAccountNoInput('accountNo');
        expect(supplierDialogPage.getAccountNoInput()).toMatch('accountNo');
        supplierDialogPage.contactPersonSelectLastOption();
        supplierDialogPage.purchaseOrderSelectLastOption();
        supplierDialogPage.save();
        expect(supplierDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class SupplierComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-supplier-mc div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class SupplierDialogPage {
    modalTitle = element(by.css('h4#mySupplierLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    addressInput = element(by.css('input#field_address'));
    domainInput = element(by.css('input#field_domain'));
    webInput = element(by.css('input#field_web'));
    phoneInput = element(by.css('input#field_phone'));
    accountNoInput = element(by.css('input#field_accountNo'));
    contactPersonSelect = element(by.css('select#field_contactPerson'));
    purchaseOrderSelect = element(by.css('select#field_purchaseOrder'));

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

    setDomainInput = function(domain) {
        this.domainInput.sendKeys(domain);
    };

    getDomainInput = function() {
        return this.domainInput.getAttribute('value');
    };

    setWebInput = function(web) {
        this.webInput.sendKeys(web);
    };

    getWebInput = function() {
        return this.webInput.getAttribute('value');
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

    purchaseOrderSelectLastOption = function() {
        this.purchaseOrderSelect.all(by.tagName('option')).last().click();
    };

    purchaseOrderSelectOption = function(option) {
        this.purchaseOrderSelect.sendKeys(option);
    };

    getPurchaseOrderSelect = function() {
        return this.purchaseOrderSelect;
    };

    getPurchaseOrderSelectedOption = function() {
        return this.purchaseOrderSelect.element(by.css('option:checked')).getText();
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
