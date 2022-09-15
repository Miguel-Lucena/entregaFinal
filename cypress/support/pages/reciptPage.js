export class ReciptPage {
    constructor(){
        this.numberCardInput = '//p[@id="creditCard"]';
        this.totalPriceProducts = '//p[@id="totalPrice"]'
    }

    checkFirstNameClient(FirstName, LastName){
        cy.xpath(`//p[@id="name"]`, {timeout:20000}).should("be.visible").and("have.text", `${FirstName} ${LastName} has succesfully purchased the following items`);
    }
    checkPNameProduct(nameProduct){
        cy.xpath(`//p[@id="${nameProduct}"]`).should("be.visible").and("have.text", nameProduct);
    }
    checkNumberCard(numberCard){
        cy.xpath(this.numberCardInput).should("be.visible").and("have.text", numberCard);
    }
    checkTotalPriceProducts(totalPriceProducts){
        cy.xpath(this.totalPriceProducts).invoke('text').then((text) =>{
            assert.equal(text, `You have spent $${totalPriceProducts}`)
        })
    }
}