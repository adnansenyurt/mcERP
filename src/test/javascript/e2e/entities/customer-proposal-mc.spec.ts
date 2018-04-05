import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('CustomerProposal e2e test', () => {

    let navBarPage: NavBarPage;
    let customerProposalDialogPage: CustomerProposalDialogPage;
    let customerProposalComponentsPage: CustomerProposalComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load CustomerProposals', () => {
        navBarPage.goToEntity('customer-proposal-mc');
        customerProposalComponentsPage = new CustomerProposalComponentsPage();
        expect(customerProposalComponentsPage.getTitle())
            .toMatch(/mcErpApp.customerProposal.home.title/);

    });

    it('should load create CustomerProposal dialog', () => {
        customerProposalComponentsPage.clickOnCreateButton();
        customerProposalDialogPage = new CustomerProposalDialogPage();
        expect(customerProposalDialogPage.getModalTitle())
            .toMatch(/mcErpApp.customerProposal.home.createOrEditLabel/);
        customerProposalDialogPage.close();
    });

    it('should create and save CustomerProposals', () => {
        customerProposalComponentsPage.clickOnCreateButton();
        customerProposalDialogPage.setNameInput('name');
        expect(customerProposalDialogPage.getNameInput()).toMatch('name');
        customerProposalDialogPage.setDateSubmittedInput(12310020012301);
        expect(customerProposalDialogPage.getDateSubmittedInput()).toMatch('2001-12-31T02:30');
        customerProposalDialogPage.setDurationInput('5');
        expect(customerProposalDialogPage.getDurationInput()).toMatch('5');
        customerProposalDialogPage.setAmountInput('5');
        expect(customerProposalDialogPage.getAmountInput()).toMatch('5');
        customerProposalDialogPage.customerSelectLastOption();
        customerProposalDialogPage.save();
        expect(customerProposalDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class CustomerProposalComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-customer-proposal-mc div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class CustomerProposalDialogPage {
    modalTitle = element(by.css('h4#myCustomerProposalLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    dateSubmittedInput = element(by.css('input#field_dateSubmitted'));
    durationInput = element(by.css('input#field_duration'));
    amountInput = element(by.css('input#field_amount'));
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

    setDateSubmittedInput = function(dateSubmitted) {
        this.dateSubmittedInput.sendKeys(dateSubmitted);
    };

    getDateSubmittedInput = function() {
        return this.dateSubmittedInput.getAttribute('value');
    };

    setDurationInput = function(duration) {
        this.durationInput.sendKeys(duration);
    };

    getDurationInput = function() {
        return this.durationInput.getAttribute('value');
    };

    setAmountInput = function(amount) {
        this.amountInput.sendKeys(amount);
    };

    getAmountInput = function() {
        return this.amountInput.getAttribute('value');
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
