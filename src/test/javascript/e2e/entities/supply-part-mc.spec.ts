import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('SupplyPart e2e test', () => {

    let navBarPage: NavBarPage;
    let supplyPartDialogPage: SupplyPartDialogPage;
    let supplyPartComponentsPage: SupplyPartComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load SupplyParts', () => {
        navBarPage.goToEntity('supply-part-mc');
        supplyPartComponentsPage = new SupplyPartComponentsPage();
        expect(supplyPartComponentsPage.getTitle())
            .toMatch(/mcErpApp.supplyPart.home.title/);

    });

    it('should load create SupplyPart dialog', () => {
        supplyPartComponentsPage.clickOnCreateButton();
        supplyPartDialogPage = new SupplyPartDialogPage();
        expect(supplyPartDialogPage.getModalTitle())
            .toMatch(/mcErpApp.supplyPart.home.createOrEditLabel/);
        supplyPartDialogPage.close();
    });

    it('should create and save SupplyParts', () => {
        supplyPartComponentsPage.clickOnCreateButton();
        supplyPartDialogPage.setNameInput('name');
        expect(supplyPartDialogPage.getNameInput()).toMatch('name');
        supplyPartDialogPage.setSupplierPartCodeInput('supplierPartCode');
        expect(supplyPartDialogPage.getSupplierPartCodeInput()).toMatch('supplierPartCode');
        supplyPartDialogPage.setDescriptionInput('description');
        expect(supplyPartDialogPage.getDescriptionInput()).toMatch('description');
        supplyPartDialogPage.contractSelectLastOption();
        supplyPartDialogPage.supplyStockSelectLastOption();
        supplyPartDialogPage.save();
        expect(supplyPartDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class SupplyPartComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-supply-part-mc div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class SupplyPartDialogPage {
    modalTitle = element(by.css('h4#mySupplyPartLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    supplierPartCodeInput = element(by.css('input#field_supplierPartCode'));
    descriptionInput = element(by.css('input#field_description'));
    contractSelect = element(by.css('select#field_contract'));
    supplyStockSelect = element(by.css('select#field_supplyStock'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    };

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
    };

    setSupplierPartCodeInput = function(supplierPartCode) {
        this.supplierPartCodeInput.sendKeys(supplierPartCode);
    };

    getSupplierPartCodeInput = function() {
        return this.supplierPartCodeInput.getAttribute('value');
    };

    setDescriptionInput = function(description) {
        this.descriptionInput.sendKeys(description);
    };

    getDescriptionInput = function() {
        return this.descriptionInput.getAttribute('value');
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

    supplyStockSelectLastOption = function() {
        this.supplyStockSelect.all(by.tagName('option')).last().click();
    };

    supplyStockSelectOption = function(option) {
        this.supplyStockSelect.sendKeys(option);
    };

    getSupplyStockSelect = function() {
        return this.supplyStockSelect;
    };

    getSupplyStockSelectedOption = function() {
        return this.supplyStockSelect.element(by.css('option:checked')).getText();
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
