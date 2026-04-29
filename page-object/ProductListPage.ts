import { expect, Locator, Page } from "@playwright/test";
import BasePage from "./BasePage";

class ProductListPage extends BasePage {

    private readonly page: Page
    private readonly productName: Locator
    private readonly productCard: Locator
    private readonly quantitySelectorCustomField: Locator
    private readonly quantitySelectorCustomFieldButtonOK: Locator

    constructor(page: Page){
        super(page)
        this.page = page
        this.productCard = this.page.getByRole('article')
        this.productName = this.productCard.getByRole('heading', {level: 3})
        this.quantitySelectorCustomField = this.page.getByRole('textbox', {name: 'Choose a quantity'})
        this.quantitySelectorCustomFieldButtonOK = this.page.getByRole('button', {name: 'OK'})
        
    }

    async getNameOfFirstProduct(){
        return await this.productName.first().textContent()
    }

    async getPriceOfFirstProduct(){
        const fullPrice = await this.productCard.first().locator('[class*="_price_"]').textContent() //we will get price with form $x.xx 
        return fullPrice
    }

    async addFirstProductToCart(quantity: number){
        const firstProduct = this.productCard.first()
        const currentMiniCart = await this.headerNavigationPage.getMiniBasketText()
        await firstProduct.getByRole('button', {name: 'add the product'}).click()
        await this.selectQuantity(quantity)
        //or we can use
        //await this.fillQuantitySelectorCustomField(quantity)
        await this.headerNavigationPage.waitUntilMiniCarteTextChange(currentMiniCart!)
    }

    async selectQuantity(quantity: number){
        await this.page.getByText(quantity.toString(), {exact: true}).click()
    }

    async fillQuantitySelectorCustomField(quantity: number){
        await this.quantitySelectorCustomField.fill(quantity.toString())
        await this.quantitySelectorCustomFieldButtonOK.click()
    }
   
}

export default ProductListPage