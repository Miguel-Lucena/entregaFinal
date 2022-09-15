/// <reference types="cypress" />
import { HomePage } from "../support/pages/homePage"
import { ProductsPage} from "../support/pages/productsPage"
import { ShoppingCartPage } from "../support/pages/shoppingCartPage"
import { CheckoutPage }   from "../support/pages/checkoutPage"
import { ReciptPage } from "../support/pages/reciptPage"
import { NavbarPage } from "../support/pages/navbarPage"


describe('empty spec', () => {
  let  product, dataCheckOut;
  var totalPriceProducts;
  const id = Math.floor(Math.random() * 10000);
  const userName = "Miguel"+id;
  const userPassword = "123456!";
  const userGender ="Male";
  const userDay = "18";
  const userMonth= "06";
  const userYear = "1997";
  const homePage = new HomePage();
  const productsPage = new ProductsPage();
  const shoppingCartPage = new ShoppingCartPage();
  const checkoutPage = new CheckoutPage();
  const reciptPage = new ReciptPage();
  const navbarPage = new NavbarPage();


  before("beforetest", ()=>{
    cy.fixture("products").then(products =>{
      product = products;
      totalPriceProducts = product.firstProduct.priceProduct + product.secondProduct.priceProduct;
    })
    cy.fixture("checkOut").then(dataCheck => {
      dataCheckOut=dataCheck;
    })

    cy.request({
      method: 'POST',
      url: "https://pushing-it-backend.herokuapp.com/api/register",
      body:{
          username : userName,
          password: userPassword,
          gender: userGender,
          day: userDay,
          month: userMonth,
          year: userYear,
      }
    }).then(response=> {
      expect(response.status).to.equal(200);
    })

    cy.request({
      method: "POST", 
      url: "https://pushing-it-backend.herokuapp.com/api/login",
      body: {
          "username":userName,
          "password": userPassword
      }
    }).then(response => {
      expect(response.status).to.equal(200);
      window.localStorage.setItem("token", response.body.token);
      window.localStorage.setItem("user", response.body.user.username);
    })
    cy.visit("");
  })

  it('test-Entrega-Final', () => {
    homePage.clickLinkOnlineShop();
    productsPage.clickButtonAddToCartProduct(product.firstProduct.nameProduct);
    productsPage.clikCloseButton();
    productsPage.clickButtonAddToCartProduct(product.secondProduct.nameProduct);
    productsPage.clikCloseButton();
    productsPage.clickButtonGoToShoppingCart();
    shoppingCartPage.getPNameProduct(product.firstProduct.nameProduct);
    shoppingCartPage.getPPriceProduct(product.firstProduct.nameProduct, product.firstProduct.priceProduct);
    shoppingCartPage.getPNameProduct(product.secondProduct.nameProduct);
    shoppingCartPage.getPPriceProduct(product.secondProduct.nameProduct, product.secondProduct.priceProduct);
    shoppingCartPage.clickShowTotalPriceButton();
    shoppingCartPage.checkTotalPriceProducts(totalPriceProducts);
    shoppingCartPage.clickGoToCheckOutButton();
    checkoutPage.setFirstNameInput(dataCheckOut.firstName);
    checkoutPage.setLastNameInput(dataCheckOut.lastName);
    checkoutPage.setCardNumberInput(dataCheckOut.cardNumber);
    checkoutPage.clickPurchaseButton();
    reciptPage.checkFirstNameClient(dataCheckOut.firstName, dataCheckOut.lastName);
    reciptPage.checkPNameProduct(product.firstProduct.nameProduct);
    reciptPage.checkPNameProduct(product.secondProduct.nameProduct);
    reciptPage.checkNumberCard(dataCheckOut.cardNumber);
    reciptPage.checkTotalPriceProducts(totalPriceProducts)
    reciptPage.clickThankYouButton();
    navbarPage.clickLogoutButton();
  })

  after("afterTest", ()=>{
    cy.request({
      method: "DELETE",
      url: `https://pushing-it-backend.herokuapp.com/api/deleteuser/${userName}`,
    }).then(response=>{
      expect(response.status).to.equal(200);
    })
  })
})
