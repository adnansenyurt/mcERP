import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('SupplierContract e2e test', () => {

    let navBarPage: NavBarPage;
    let supplierContractDialogPage: SupplierContractDialogPage;
    let supplierContractComponentsPage: SupplierContractComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load SupplierContracts', () => {
        navBarPage.goToEntity('supplier-contract-mc');
        supplierContractComponentsPage = new SupplierContractComponentsPage();
        expect(supplierContractComponentsPage.getTitle())
            .toMatch(/mcErpApp.supplierContract.home.title/);

    });

    it('should load create SupplierContract dialog', () => {
        supplierContractComponentsPage.clickOnCreateButton();
        supplierContractDialogPage = new SupplierContractDialogPage();
        expect(supplierContractDialogPage.getModalTitle())
            .toMatch(/mcErpApp.supplierContract.home.createOrEditLabel/);
        supplierContractDialogPage.close();
    });

    it('should create and save SupplierContracts', () => {
        supplierContractComponentsPage.clickOnCreateButton();
        supplierContractDialogPage.setNameInput('name');
        expect(supplierContractDialogPage.getNameInput()).toMatch('name');
        supplierContractDialogPage.setDateSignedInput(12310020012301);
        expect(supplierContractDialogPage.getDateSignedInput()).toMatch('2001-12-31T02:30');
        supplierContractDialogPage.save();
        expect(supplierContractDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class SupplierContractComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-supplier-contract-mc div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class SupplierContractDialogPage {
    modalTitle = element(by.css('h4#mySupplierContractLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    dateSignedInput = element(by.css('input#field_dateSigned'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    };

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
    };

    setDateSignedInput = function(dateSigned) {
        this.dateSignedInput.sendKeys(dateSigned);
    };

    getDateSignedInput = function() {
        return this.dateSignedInput.getAttribute('value');
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
