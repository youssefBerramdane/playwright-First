import {expect, test} from '@playwright/test'
import PageManager from '../page-object/PageManager'
import CookiesPopup from '../page-object/components/CookiesPopup'
import NespressonURL from '../test-data/NespressoURL.json'

test('Add Product to Cart from Product Page', async ({page})=> {
    await page.goto(NespressonURL['MACHINE PRODUCT PAGE'])
    const cookiesPopup = new CookiesPopup(page)
    await cookiesPopup.acceptCookies()
    const quantityToAddToCart = 1
    const pageManager = new PageManager(page)
    const productTitle = await pageManager.userIsInProductDetailsPage().getProductTitle()
    await pageManager.userIsInProductDetailsPage().addToCart(quantityToAddToCart)
    await pageManager.userIsInProductDetailsPage().headerNavigationPage.openMiniBasket()
    await pageManager.userInProductLisPage().miniCartDropDown.checkCartContainsNumberOfItems(1)
    await pageManager.userInProductLisPage().miniCartDropDown.checkCartContainsProductWithName(productTitle!)
    await pageManager.userInProductLisPage().miniCartDropDown.checkCartContainsQuantityOfProduct(productTitle!, quantityToAddToCart)
})

test('Add Capsules from Listing Page', async ({page}) =>{
    await page.goto(NespressonURL['CAPSULE LISTING PAGE'])
    const cookiesPopup = new CookiesPopup(page)
    await cookiesPopup.acceptCookies()
    const quantity = 20
    const pageManager = new PageManager(page)
    const firstProductName = await pageManager.userInProductLisPage().getNameOfFirstProduct()
    const firstProductPrice = await pageManager.userInProductLisPage().getPriceOfFirstProduct()
    await pageManager.userInProductLisPage().addFirstProductToCart(quantity)
    await pageManager.userInProductLisPage().headerNavigationPage.openMiniBasket()

    await pageManager.userInProductLisPage().miniCartDropDown.checkCartContainsProductWithName(firstProductName!)
    await pageManager.userInProductLisPage().miniCartDropDown.checkTheProductAddedToCart()
    await pageManager.userInProductLisPage().miniCartDropDown.checkCartContainsQuantityOfProduct(firstProductName!, quantity)
    await pageManager.userInProductLisPage().miniCartDropDown.checkPriceOfProductIsVisible(firstProductName!, firstProductPrice!)

    await pageManager.userInProductLisPage().miniCartDropDown.checkTheTotalPriceForProductIsVisible(firstProductName!, firstProductPrice!, quantity)
})