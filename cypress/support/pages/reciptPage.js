export class ReciptPage {
    constructor(){
        this.nameClientP = '//p[@id="name"]'
        this.numberCardP = '//p[@id="creditCard"]';
        this.totalPriceProductsP = '//p[@id="totalPrice"]';
        this.thankYouButton = '//button[text()="Thank you"]';
    }

    checkFirstNameClient(FirstName, LastName){
        cy.xpath(this.nameClientP, {timeout:20000}).should("be.visible").and("have.text", `${FirstName} ${LastName} has succesfully purchased the following items`);
    }
    checkPNameProduct(nameProduct){
        cy.xpath(`//p[@id="${nameProduct}"]`).should("be.visible").and("have.text", nameProduct);
    }
    checkNumberCard(numberCard){
        cy.xpath(this.numberCardP).should("be.visible").and("have.text", numberCard);
    }
    checkTotalPriceProducts(totalPriceProducts){
        cy.xpath(this.totalPriceProductsP).invoke('text').then((text) =>{
            assert.equal(text, `You have spent $${totalPriceProducts}`)
        })
    }
    clickThankYouButton(){
        cy.xpath(this.thankYouButton).click();
    }
}