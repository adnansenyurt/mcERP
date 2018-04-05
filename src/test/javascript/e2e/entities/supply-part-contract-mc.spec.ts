import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('SupplyPartContract e2e test', () => {

    let navBarPage: NavBarPage;
    let supplyPartContractDialogPage: SupplyPartContractDialogPage;
    let supplyPartContractComponentsPage: SupplyPartContractComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load SupplyPartContracts', () => {
        navBarPage.goToEntity('supply-part-contract-mc');
        supplyPartContractComponentsPage = new SupplyPartContractComponentsPage();
        expect(supplyPartContractComponentsPage.getTitle())
            .toMatch(/mcErpApp.supplyPartContract.home.title/);

    });

    it('should load create SupplyPartContract dialog', () => {
        supplyPartContractComponentsPage.clickOnCreateButton();
        supplyPartContractDialogPage = new SupplyPartContractDialogPage();
        expect(supplyPartContractDialogPage.getModalTitle())
            .toMatch(/mcErpApp.supplyPartContract.home.createOrEditLabel/);
        supplyPartContractDialogPage.close();
    });

    it('should create and save SupplyPartContracts', () => {
        supplyPartContractComponentsPage.clickOnCreateButton();
        supplyPartContractDialogPage.save();
        expect(supplyPartContractDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class SupplyPartContractComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-supply-part-contract-mc div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class SupplyPartContractDialogPage {
    modalTitle = element(by.css('h4#mySupplyPartContractLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

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
