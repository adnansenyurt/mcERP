import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('SupplyStock e2e test', () => {

    let navBarPage: NavBarPage;
    let supplyStockDialogPage: SupplyStockDialogPage;
    let supplyStockComponentsPage: SupplyStockComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load SupplyStocks', () => {
        navBarPage.goToEntity('supply-stock-mc');
        supplyStockComponentsPage = new SupplyStockComponentsPage();
        expect(supplyStockComponentsPage.getTitle())
            .toMatch(/mcErpApp.supplyStock.home.title/);

    });

    it('should load create SupplyStock dialog', () => {
        supplyStockComponentsPage.clickOnCreateButton();
        supplyStockDialogPage = new SupplyStockDialogPage();
        expect(supplyStockDialogPage.getModalTitle())
            .toMatch(/mcErpApp.supplyStock.home.createOrEditLabel/);
        supplyStockDialogPage.close();
    });

    it('should create and save SupplyStocks', () => {
        supplyStockComponentsPage.clickOnCreateButton();
        supplyStockDialogPage.setNameInput('name');
        expect(supplyStockDialogPage.getNameInput()).toMatch('name');
        supplyStockDialogPage.setAmountInput('5');
        expect(supplyStockDialogPage.getAmountInput()).toMatch('5');
        supplyStockDialogPage.supplyPartSelectLastOption();
        supplyStockDialogPage.save();
        expect(supplyStockDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class SupplyStockComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-supply-stock-mc div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class SupplyStockDialogPage {
    modalTitle = element(by.css('h4#mySupplyStockLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    amountInput = element(by.css('input#field_amount'));
    supplyPartSelect = element(by.css('select#field_supplyPart'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    };

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
    };

    setAmountInput = function(amount) {
        this.amountInput.sendKeys(amount);
    };

    getAmountInput = function() {
        return this.amountInput.getAttribute('value');
    };

    supplyPartSelectLastOption = function() {
        this.supplyPartSelect.all(by.tagName('option')).last().click();
    };

    supplyPartSelectOption = function(option) {
        this.supplyPartSelect.sendKeys(option);
    };

    getSupplyPartSelect = function() {
        return this.supplyPartSelect;
    };

    getSupplyPartSelectedOption = function() {
        return this.supplyPartSelect.element(by.css('option:checked')).getText();
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
