export class ProductsPage {
    constructor(){
        this.buttonClose = '//button[@id="closeModal"]'
        this.GoToShoppingCartButton = '//button[@id="goShoppingCart"]' 
    }

    clickButtonAddToCartProduct(nameProduct){
        cy.xpath(`//button[@value="${nameProduct}"]`).click();
    }
    clikCloseButton(){
        cy.xpath(this.buttonClose).click();
    }
    clickButtonGoToShoppingCart(){
        cy.xpath(this.GoToShoppingCartButton).click();
    }
}