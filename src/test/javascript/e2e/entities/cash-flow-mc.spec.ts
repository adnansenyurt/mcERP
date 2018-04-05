import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('CashFlow e2e test', () => {

    let navBarPage: NavBarPage;
    let cashFlowDialogPage: CashFlowDialogPage;
    let cashFlowComponentsPage: CashFlowComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load CashFlows', () => {
        navBarPage.goToEntity('cash-flow-mc');
        cashFlowComponentsPage = new CashFlowComponentsPage();
        expect(cashFlowComponentsPage.getTitle())
            .toMatch(/mcErpApp.cashFlow.home.title/);

    });

    it('should load create CashFlow dialog', () => {
        cashFlowComponentsPage.clickOnCreateButton();
        cashFlowDialogPage = new CashFlowDialogPage();
        expect(cashFlowDialogPage.getModalTitle())
            .toMatch(/mcErpApp.cashFlow.home.createOrEditLabel/);
        cashFlowDialogPage.close();
    });

    it('should create and save CashFlows', () => {
        cashFlowComponentsPage.clickOnCreateButton();
        cashFlowDialogPage.setDatePaymentInput(12310020012301);
        expect(cashFlowDialogPage.getDatePaymentInput()).toMatch('2001-12-31T02:30');
        cashFlowDialogPage.directionSelectLastOption();
        cashFlowDialogPage.typeSelectLastOption();
        cashFlowDialogPage.setAmountInput('5');
        expect(cashFlowDialogPage.getAmountInput()).toMatch('5');
        cashFlowDialogPage.setDescriptionInput('description');
        expect(cashFlowDialogPage.getDescriptionInput()).toMatch('description');
        cashFlowDialogPage.currentStatusSelectLastOption();
        cashFlowDialogPage.save();
        expect(cashFlowDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class CashFlowComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-cash-flow-mc div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class CashFlowDialogPage {
    modalTitle = element(by.css('h4#myCashFlowLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    datePaymentInput = element(by.css('input#field_datePayment'));
    directionSelect = element(by.css('select#field_direction'));
    typeSelect = element(by.css('select#field_type'));
    amountInput = element(by.css('input#field_amount'));
    descriptionInput = element(by.css('input#field_description'));
    currentStatusSelect = element(by.css('select#field_currentStatus'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setDatePaymentInput = function(datePayment) {
        this.datePaymentInput.sendKeys(datePayment);
    };

    getDatePaymentInput = function() {
        return this.datePaymentInput.getAttribute('value');
    };

    setDirectionSelect = function(direction) {
        this.directionSelect.sendKeys(direction);
    };

    getDirectionSelect = function() {
        return this.directionSelect.element(by.css('option:checked')).getText();
    };

    directionSelectLastOption = function() {
        this.directionSelect.all(by.tagName('option')).last().click();
    };
    setTypeSelect = function(type) {
        this.typeSelect.sendKeys(type);
    };

    getTypeSelect = function() {
        return this.typeSelect.element(by.css('option:checked')).getText();
    };

    typeSelectLastOption = function() {
        this.typeSelect.all(by.tagName('option')).last().click();
    };
    setAmountInput = function(amount) {
        this.amountInput.sendKeys(amount);
    };

    getAmountInput = function() {
        return this.amountInput.getAttribute('value');
    };

    setDescriptionInput = function(description) {
        this.descriptionInput.sendKeys(description);
    };

    getDescriptionInput = function() {
        return this.descriptionInput.getAttribute('value');
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
