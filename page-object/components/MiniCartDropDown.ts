import { expect, Locator, Page } from "@playwright/test";

class MiniCartDropDown {
    
    private readonly page:Page
    private readonly ItemAddedToCart: Locator
    private readonly TotalCartPrice: Locator
    private readonly checkoutButton: Locator
    

    constructor(page: Page){
        this.page = page

        // Add 'button' because we have gifts as cart items added with machine
        this.ItemAddedToCart = this.page.locator('[class="MiniBasketItem"]', {has: this.page.getByRole('button')})
        this.TotalCartPrice = this.page.getByRole('row', {name: 'Total'})
        this.checkoutButton = this.page.getByRole('button', {name: 'Open shopping bag'})
    }

    //Get All items in the Cart
    async getItemsInCart(){
        await this.ItemAddedToCart.first().waitFor({state: 'visible'})
        return await this.ItemAddedToCart.all()
    }

    async increaseProductQuantityTo(newQuantity: number){
        await this.ItemAddedToCart.getByRole('button').click()
        await this.page.getByRole('button', {name: `Update to ${newQuantity.toString()}`}).click()
    }

    async checkTheProductAddedToCart(){
        await this.checkCartContainsNumberOfItems(1)
    }

    async checkCartContainsNumberOfItems(itemsNumber: number){
        //we need to get All items in the cart then verify that the length is equal itemNumber
        expect(await this.getItemsInCart()).toHaveLength(itemsNumber)
    }

    async checkCartContainsProductWithName(productName: string){
        await expect(this.ItemAddedToCart.getByText(productName, {exact:true})).toBeVisible()
    }

    // Check the quantity is visible in button next to Product name
    async checktheQuantityOfProductIsVisible(productName :string, quantity: number){
        await expect(this.ItemAddedToCart.filter({has: this.page.getByText(productName)}).getByRole('button', {name:quantity.toString()})).toBeVisible()
    }

    //the same things with the previous method
    async checkCartContainsQuantityOfProduct(productName: string, quntity :number){
        await expect(this.ItemAddedToCart.filter({has: this.page.getByText(productName)}).getByRole('button')).toContainText(quntity.toString())
    }

    async checkPriceOfProductIsVisible(productName: string, productPrice: string){
        await expect(this.ItemAddedToCart.filter({has: this.page.getByText(productName)}).getByText(productPrice)).toBeVisible()
        // we can use also 
        //await expect(this.ItemAddedToCart.filter({has: this.page.getByText(productName)})).toContainText(productPrice)
    }

    // Check the total price of a product added to the Cart
    async checkTheTotalPriceForProductIsVisible(productName: string, productPrice: string, quantity: number){
        const totalProductPrice =  this.getTotalProductPrice(this.getPriceOfProductFromString(productPrice), quantity)
        await expect(this.ItemAddedToCart.filter({has: this.page.getByText(productName)})).toContainText(totalProductPrice.toString())

    }

    //check the quantity is visible for first product
    async checkQuantityFieldContainsQuantity(quantity: number){
        await expect(this.ItemAddedToCart.first().getByRole('button', {name: 'You have'})).toContainText(quantity.toString())
    }

    async checkCartTotalPriceChanged(currentTotalPrice: string){
        await expect(this.TotalCartPrice).not.toHaveText(currentTotalPrice)
    }

    getTotalProductPrice(productPrice: number, quantity: number){
        return productPrice*quantity
    }

    async getCartTotalPrice(){
        return await this.TotalCartPrice.textContent()
    }

    async getFirstProductPriceInfo(){
        return await this.ItemAddedToCart.locator('.MiniBasketItemPriceAndName__price').first().textContent()
    }

    // We check the price of first product was chenged
    async checkProductPriceChanged(currentFirstProductPrice: string){
        await expect(this.getFirstProductPriceInfo()).not.toEqual(currentFirstProductPrice)
    }

    async goToCheckout(){
        await this.checkoutButton.click()
    }

    // The price is like '$xx.x' we need to get the number 'x.xx'
    getPriceOfProductFromString(fullPrice: string){
        const price = fullPrice.split('$')[1]
        return +price
    }

}

export default MiniCartDropDown