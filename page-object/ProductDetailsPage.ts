import { expect, Locator, Page } from "@playwright/test";
import BasePage from "./BasePage";

class ProductDetailsPage extends BasePage {

    private readonly page: Page
    private readonly productTitle: Locator
    private readonly addToCartButton: Locator
    private readonly quantitySelectorCustomField: Locator
    private readonly quantitySelectorCustomFieldButtonOK: Locator

    

    constructor(page: Page){
        super(page)
        this.page = page
        this.productTitle = this.page.getByRole('heading', {level: 1})
        this.addToCartButton = this.page.getByRole('button').filter({hasText: 'Add to Cart'})
        this.quantitySelectorCustomField = this.page.getByRole('textbox', {name: 'Choose a quantity'})
        this.quantitySelectorCustomFieldButtonOK = this.page.getByRole('button', {name: 'OK'})
    }

    async getProductTitle(){
        return await this.productTitle.textContent()
    }

    async addToCart(quantity: number){
        await this.addToCartButton.click()
        await this.selectQuantity(quantity)
        // Or we can use 
        //await this.fillQuantitySelectorCustomField(quantity)
        await this.page.getByRole('button', {name: '×'}).click()
    }

    async selectQuantity(quantity: number){
        await this.page.getByRole('button', {name: `Add ${quantity.toString()}`}).click()
    }

    async fillQuantitySelectorCustomField(quantity: number){
        await this.quantitySelectorCustomField.fill(quantity.toString())
        await this.quantitySelectorCustomFieldButtonOK.click()
    }

}

export default ProductDetailsPage