export class NavbarPage {
    constructor(){
        this.logoutButton = '//button[@id="logout"]';
    }
    clickLogoutButton(){
        cy.xpath(this.logoutButton).click();
    }
}