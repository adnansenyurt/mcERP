import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('ProductStock e2e test', () => {

    let navBarPage: NavBarPage;
    let productStockDialogPage: ProductStockDialogPage;
    let productStockComponentsPage: ProductStockComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load ProductStocks', () => {
        navBarPage.goToEntity('product-stock-mc');
        productStockComponentsPage = new ProductStockComponentsPage();
        expect(productStockComponentsPage.getTitle())
            .toMatch(/mcErpApp.productStock.home.title/);

    });

    it('should load create ProductStock dialog', () => {
        productStockComponentsPage.clickOnCreateButton();
        productStockDialogPage = new ProductStockDialogPage();
        expect(productStockDialogPage.getModalTitle())
            .toMatch(/mcErpApp.productStock.home.createOrEditLabel/);
        productStockDialogPage.close();
    });

    it('should create and save ProductStocks', () => {
        productStockComponentsPage.clickOnCreateButton();
        productStockDialogPage.setSkuCodeInput('skuCode');
        expect(productStockDialogPage.getSkuCodeInput()).toMatch('skuCode');
        productStockDialogPage.setAmountInput('5');
        expect(productStockDialogPage.getAmountInput()).toMatch('5');
        productStockDialogPage.productSelectLastOption();
        productStockDialogPage.save();
        expect(productStockDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ProductStockComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-product-stock-mc div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ProductStockDialogPage {
    modalTitle = element(by.css('h4#myProductStockLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    skuCodeInput = element(by.css('input#field_skuCode'));
    amountInput = element(by.css('input#field_amount'));
    productSelect = element(by.css('select#field_product'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setSkuCodeInput = function(skuCode) {
        this.skuCodeInput.sendKeys(skuCode);
    };

    getSkuCodeInput = function() {
        return this.skuCodeInput.getAttribute('value');
    };

    setAmountInput = function(amount) {
        this.amountInput.sendKeys(amount);
    };

    getAmountInput = function() {
        return this.amountInput.getAttribute('value');
    };

    productSelectLastOption = function() {
        this.productSelect.all(by.tagName('option')).last().click();
    };

    productSelectOption = function(option) {
        this.productSelect.sendKeys(option);
    };

    getProductSelect = function() {
        return this.productSelect;
    };

    getProductSelectedOption = function() {
        return this.productSelect.element(by.css('option:checked')).getText();
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
