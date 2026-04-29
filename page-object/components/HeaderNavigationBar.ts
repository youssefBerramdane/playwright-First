import { expect, Locator, Page } from "@playwright/test";

class HeaderNavigationBar {

    private readonly page: Page
    private readonly miniBasketButton: Locator

    constructor(page: Page){
        this.page = page
        this.miniBasketButton = this.page.getByRole('button', {name: 'YOUR BASKET ('})
    }

    async openMiniBasket(){
        await this.miniBasketButton.click()
    }

    async waitUntilMiniCarteTextChange(currentMiniCartText: string){
        await expect(this.miniBasketButton).not.toHaveText(currentMiniCartText)
    }

    async getMiniBasketText(){
        return await this.miniBasketButton.textContent()
    }
}

export default HeaderNavigationBar