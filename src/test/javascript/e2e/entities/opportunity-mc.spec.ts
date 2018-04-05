import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Opportunity e2e test', () => {

    let navBarPage: NavBarPage;
    let opportunityDialogPage: OpportunityDialogPage;
    let opportunityComponentsPage: OpportunityComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Opportunities', () => {
        navBarPage.goToEntity('opportunity-mc');
        opportunityComponentsPage = new OpportunityComponentsPage();
        expect(opportunityComponentsPage.getTitle())
            .toMatch(/mcErpApp.opportunity.home.title/);

    });

    it('should load create Opportunity dialog', () => {
        opportunityComponentsPage.clickOnCreateButton();
        opportunityDialogPage = new OpportunityDialogPage();
        expect(opportunityDialogPage.getModalTitle())
            .toMatch(/mcErpApp.opportunity.home.createOrEditLabel/);
        opportunityDialogPage.close();
    });

    it('should create and save Opportunities', () => {
        opportunityComponentsPage.clickOnCreateButton();
        opportunityDialogPage.setNameInput('name');
        expect(opportunityDialogPage.getNameInput()).toMatch('name');
        opportunityDialogPage.setDateOpenedInput(12310020012301);
        expect(opportunityDialogPage.getDateOpenedInput()).toMatch('2001-12-31T02:30');
        opportunityDialogPage.setAmountInput('5');
        expect(opportunityDialogPage.getAmountInput()).toMatch('5');
        opportunityDialogPage.currentStatusSelectLastOption();
        opportunityDialogPage.customerSelectLastOption();
        opportunityDialogPage.save();
        expect(opportunityDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class OpportunityComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-opportunity-mc div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class OpportunityDialogPage {
    modalTitle = element(by.css('h4#myOpportunityLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    dateOpenedInput = element(by.css('input#field_dateOpened'));
    amountInput = element(by.css('input#field_amount'));
    currentStatusSelect = element(by.css('select#field_currentStatus'));
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

    setCurrentStatusSelect = function(currentStatus) {
        this.currentStatusSelect.sendKeys(currentStatus);
    };

    getCurrentStatusSelect = function() {
        return this.currentStatusSelect.element(by.css('option:checked')).getText();
    };

    currentStatusSelectLastOption = function() {
        this.currentStatusSelect.all(by.tagName('option')).last().click();
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
