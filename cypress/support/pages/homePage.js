export class HomePage {
    constructor(){
        this.LinkOnlineShop = '//a[@id="onlineshoplink"]';
    }

    clickLinkOnlineShop(){
        cy.xpath(this.LinkOnlineShop, {timeout:15000}).click();
    }
}