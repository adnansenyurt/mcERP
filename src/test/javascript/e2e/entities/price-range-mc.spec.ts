import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('PriceRange e2e test', () => {

    let navBarPage: NavBarPage;
    let priceRangeDialogPage: PriceRangeDialogPage;
    let priceRangeComponentsPage: PriceRangeComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load PriceRanges', () => {
        navBarPage.goToEntity('price-range-mc');
        priceRangeComponentsPage = new PriceRangeComponentsPage();
        expect(priceRangeComponentsPage.getTitle())
            .toMatch(/mcErpApp.priceRange.home.title/);

    });

    it('should load create PriceRange dialog', () => {
        priceRangeComponentsPage.clickOnCreateButton();
        priceRangeDialogPage = new PriceRangeDialogPage();
        expect(priceRangeDialogPage.getModalTitle())
            .toMatch(/mcErpApp.priceRange.home.createOrEditLabel/);
        priceRangeDialogPage.close();
    });

    it('should create and save PriceRanges', () => {
        priceRangeComponentsPage.clickOnCreateButton();
        priceRangeDialogPage.setRangeLowInput('5');
        expect(priceRangeDialogPage.getRangeLowInput()).toMatch('5');
        priceRangeDialogPage.setRangeHighInput('5');
        expect(priceRangeDialogPage.getRangeHighInput()).toMatch('5');
        priceRangeDialogPage.setPriceInput('5');
        expect(priceRangeDialogPage.getPriceInput()).toMatch('5');
        priceRangeDialogPage.currencySelectLastOption();
        priceRangeDialogPage.contractSelectLastOption();
        priceRangeDialogPage.save();
        expect(priceRangeDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class PriceRangeComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-price-range-mc div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class PriceRangeDialogPage {
    modalTitle = element(by.css('h4#myPriceRangeLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    rangeLowInput = element(by.css('input#field_rangeLow'));
    rangeHighInput = element(by.css('input#field_rangeHigh'));
    priceInput = element(by.css('input#field_price'));
    currencySelect = element(by.css('select#field_currency'));
    contractSelect = element(by.css('select#field_contract'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setRangeLowInput = function(rangeLow) {
        this.rangeLowInput.sendKeys(rangeLow);
    };

    getRangeLowInput = function() {
        return this.rangeLowInput.getAttribute('value');
    };

    setRangeHighInput = function(rangeHigh) {
        this.rangeHighInput.sendKeys(rangeHigh);
    };

    getRangeHighInput = function() {
        return this.rangeHighInput.getAttribute('value');
    };

    setPriceInput = function(price) {
        this.priceInput.sendKeys(price);
    };

    getPriceInput = function() {
        return this.priceInput.getAttribute('value');
    };

    setCurrencySelect = function(currency) {
        this.currencySelect.sendKeys(currency);
    };

    getCurrencySelect = function() {
        return this.currencySelect.element(by.css('option:checked')).getText();
    };

    currencySelectLastOption = function() {
        this.currencySelect.all(by.tagName('option')).last().click();
    };
    contractSelectLastOption = function() {
        this.contractSelect.all(by.tagName('option')).last().click();
    };

    contractSelectOption = function(option) {
        this.contractSelect.sendKeys(option);
    };

    getContractSelect = function() {
        return this.contractSelect;
    };

    getContractSelectedOption = function() {
        return this.contractSelect.element(by.css('option:checked')).getText();
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
