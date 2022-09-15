export class CheckoutPage {
    constructor(){
        this.firstNameInput = '//input[@id="FirstName"]';
        this.lastNameInput = '//input[@id="lastName"]';
        this.cardNumberInput = '//input[@id="cardNumber"]';
        this.purchaseButton = '//button[text()="Purchase"]';
    }

    setFirstNameInput(FirstName){
        cy.xpath(this.firstNameInput).type(FirstName);
    }
    setLastNameInput(LastName){
        cy.xpath(this.lastNameInput).type(LastName);
    }
    setCardNumberInput(CardNumber){
        cy.xpath(this.cardNumberInput).type(CardNumber);
    }
    clickPurchaseButton(){
        cy.xpath( this.purchaseButton).click();
    }
}
