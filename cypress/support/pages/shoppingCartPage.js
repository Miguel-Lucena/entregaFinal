export class ShoppingCartPage {
    constructor(){
        this.showTotalPrice = '//button[contains(text(), "Show total price")]';
        this.totalPriceProducts = '//p[@id="price"]';
        this.goToCheckoutButton = '//button[text()="Go to Checkout"]';
    }
    getPNameProduct(nameProduct){
        cy.xpath(`//p[@name="${nameProduct}"]`).should("be.visible").and("have.text", nameProduct);
    }
    getPPriceProduct(nameProduct, priceProduct){
        cy.xpath(`//p[@name="${nameProduct}"]//following-sibling::p`).should("be.visible").and("have.text", `$${priceProduct}`);   
    }
    clickShowTotalPriceButton(){
        cy.xpath(this.showTotalPrice).click();
    }
    checkTotalPriceProducts(totalPriceProducts){
        cy.xpath(this.totalPriceProducts).invoke('text').then((text) =>{
            assert.equal(text, totalPriceProducts);
        })
    }
    clickGoToCheckOutButton(){
        cy.xpath(this.goToCheckoutButton).click();
    }
}