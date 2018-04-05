import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('ContactPerson e2e test', () => {

    let navBarPage: NavBarPage;
    let contactPersonDialogPage: ContactPersonDialogPage;
    let contactPersonComponentsPage: ContactPersonComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load ContactPeople', () => {
        navBarPage.goToEntity('contact-person-mc');
        contactPersonComponentsPage = new ContactPersonComponentsPage();
        expect(contactPersonComponentsPage.getTitle())
            .toMatch(/mcErpApp.contactPerson.home.title/);

    });

    it('should load create ContactPerson dialog', () => {
        contactPersonComponentsPage.clickOnCreateButton();
        contactPersonDialogPage = new ContactPersonDialogPage();
        expect(contactPersonDialogPage.getModalTitle())
            .toMatch(/mcErpApp.contactPerson.home.createOrEditLabel/);
        contactPersonDialogPage.close();
    });

    it('should create and save ContactPeople', () => {
        contactPersonComponentsPage.clickOnCreateButton();
        contactPersonDialogPage.setNameInput('name');
        expect(contactPersonDialogPage.getNameInput()).toMatch('name');
        contactPersonDialogPage.setRoleInput('role');
        expect(contactPersonDialogPage.getRoleInput()).toMatch('role');
        contactPersonDialogPage.setEMailInput('eMail');
        expect(contactPersonDialogPage.getEMailInput()).toMatch('eMail');
        contactPersonDialogPage.setMobileInput('mobile');
        expect(contactPersonDialogPage.getMobileInput()).toMatch('mobile');
        contactPersonDialogPage.customerSelectLastOption();
        contactPersonDialogPage.supplierSelectLastOption();
        contactPersonDialogPage.save();
        expect(contactPersonDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ContactPersonComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-contact-person-mc div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ContactPersonDialogPage {
    modalTitle = element(by.css('h4#myContactPersonLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    roleInput = element(by.css('input#field_role'));
    eMailInput = element(by.css('input#field_eMail'));
    mobileInput = element(by.css('input#field_mobile'));
    customerSelect = element(by.css('select#field_customer'));
    supplierSelect = element(by.css('select#field_supplier'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    };

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
    };

    setRoleInput = function(role) {
        this.roleInput.sendKeys(role);
    };

    getRoleInput = function() {
        return this.roleInput.getAttribute('value');
    };

    setEMailInput = function(eMail) {
        this.eMailInput.sendKeys(eMail);
    };

    getEMailInput = function() {
        return this.eMailInput.getAttribute('value');
    };

    setMobileInput = function(mobile) {
        this.mobileInput.sendKeys(mobile);
    };

    getMobileInput = function() {
        return this.mobileInput.getAttribute('value');
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

    supplierSelectLastOption = function() {
        this.supplierSelect.all(by.tagName('option')).last().click();
    };

    supplierSelectOption = function(option) {
        this.supplierSelect.sendKeys(option);
    };

    getSupplierSelect = function() {
        return this.supplierSelect;
    };

    getSupplierSelectedOption = function() {
        return this.supplierSelect.element(by.css('option:checked')).getText();
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
