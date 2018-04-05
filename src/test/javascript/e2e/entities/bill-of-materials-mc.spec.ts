import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('BillOfMaterials e2e test', () => {

    let navBarPage: NavBarPage;
    let billOfMaterialsDialogPage: BillOfMaterialsDialogPage;
    let billOfMaterialsComponentsPage: BillOfMaterialsComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load BillOfMaterials', () => {
        navBarPage.goToEntity('bill-of-materials-mc');
        billOfMaterialsComponentsPage = new BillOfMaterialsComponentsPage();
        expect(billOfMaterialsComponentsPage.getTitle())
            .toMatch(/mcErpApp.billOfMaterials.home.title/);

    });

    it('should load create BillOfMaterials dialog', () => {
        billOfMaterialsComponentsPage.clickOnCreateButton();
        billOfMaterialsDialogPage = new BillOfMaterialsDialogPage();
        expect(billOfMaterialsDialogPage.getModalTitle())
            .toMatch(/mcErpApp.billOfMaterials.home.createOrEditLabel/);
        billOfMaterialsDialogPage.close();
    });

    it('should create and save BillOfMaterials', () => {
        billOfMaterialsComponentsPage.clickOnCreateButton();
        billOfMaterialsDialogPage.setItemsInput('5');
        expect(billOfMaterialsDialogPage.getItemsInput()).toMatch('5');
        billOfMaterialsDialogPage.productSelectLastOption();
        billOfMaterialsDialogPage.supplyPartSelectLastOption();
        billOfMaterialsDialogPage.save();
        expect(billOfMaterialsDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class BillOfMaterialsComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-bill-of-materials-mc div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class BillOfMaterialsDialogPage {
    modalTitle = element(by.css('h4#myBillOfMaterialsLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    itemsInput = element(by.css('input#field_items'));
    productSelect = element(by.css('select#field_product'));
    supplyPartSelect = element(by.css('select#field_supplyPart'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setItemsInput = function(items) {
        this.itemsInput.sendKeys(items);
    };

    getItemsInput = function() {
        return this.itemsInput.getAttribute('value');
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
