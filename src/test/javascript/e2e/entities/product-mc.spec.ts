import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Product e2e test', () => {

    let navBarPage: NavBarPage;
    let productDialogPage: ProductDialogPage;
    let productComponentsPage: ProductComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Products', () => {
        navBarPage.goToEntity('product-mc');
        productComponentsPage = new ProductComponentsPage();
        expect(productComponentsPage.getTitle())
            .toMatch(/mcErpApp.product.home.title/);

    });

    it('should load create Product dialog', () => {
        productComponentsPage.clickOnCreateButton();
        productDialogPage = new ProductDialogPage();
        expect(productDialogPage.getModalTitle())
            .toMatch(/mcErpApp.product.home.createOrEditLabel/);
        productDialogPage.close();
    });

    it('should create and save Products', () => {
        productComponentsPage.clickOnCreateButton();
        productDialogPage.setNameInput('name');
        expect(productDialogPage.getNameInput()).toMatch('name');
        productDialogPage.setModelInput('model');
        expect(productDialogPage.getModelInput()).toMatch('model');
        productDialogPage.setImageInput('image');
        expect(productDialogPage.getImageInput()).toMatch('image');
        productDialogPage.setBrochureInput('brochure');
        expect(productDialogPage.getBrochureInput()).toMatch('brochure');
        productDialogPage.setSpecsURLInput('specsURL');
        expect(productDialogPage.getSpecsURLInput()).toMatch('specsURL');
        productDialogPage.opportunitySelectLastOption();
        productDialogPage.productStockSelectLastOption();
        productDialogPage.save();
        expect(productDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ProductComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-product-mc div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ProductDialogPage {
    modalTitle = element(by.css('h4#myProductLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    modelInput = element(by.css('input#field_model'));
    imageInput = element(by.css('input#field_image'));
    brochureInput = element(by.css('input#field_brochure'));
    specsURLInput = element(by.css('input#field_specsURL'));
    opportunitySelect = element(by.css('select#field_opportunity'));
    productStockSelect = element(by.css('select#field_productStock'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    };

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
    };

    setModelInput = function(model) {
        this.modelInput.sendKeys(model);
    };

    getModelInput = function() {
        return this.modelInput.getAttribute('value');
    };

    setImageInput = function(image) {
        this.imageInput.sendKeys(image);
    };

    getImageInput = function() {
        return this.imageInput.getAttribute('value');
    };

    setBrochureInput = function(brochure) {
        this.brochureInput.sendKeys(brochure);
    };

    getBrochureInput = function() {
        return this.brochureInput.getAttribute('value');
    };

    setSpecsURLInput = function(specsURL) {
        this.specsURLInput.sendKeys(specsURL);
    };

    getSpecsURLInput = function() {
        return this.specsURLInput.getAttribute('value');
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

    productStockSelectLastOption = function() {
        this.productStockSelect.all(by.tagName('option')).last().click();
    };

    productStockSelectOption = function(option) {
        this.productStockSelect.sendKeys(option);
    };

    getProductStockSelect = function() {
        return this.productStockSelect;
    };

    getProductStockSelectedOption = function() {
        return this.productStockSelect.element(by.css('option:checked')).getText();
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
