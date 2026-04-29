import { Locator, Page } from "@playwright/test";

class CookiesPopup{
    
    private readonly page: Page
    private readonly accept: Locator
    private readonly reject: Locator
    private readonly cookiesSettings: Locator

    constructor(page: Page){
        this.page = page
        this.accept = this.page.getByRole('button', {name: 'Accept All Cookies'})
        this.reject = this.page.getByRole('button', {name: 'Continue without Accepting'})
        this.cookiesSettings = this.page.getByRole('button', {name: 'Cookies Settings'})
    }

    async acceptCookies(){
        await this.accept.click()
    }

    async rejectCookies(){
        await this.reject.click()
    }

    async showCookiesSettingPopup(){
        await this.cookiesSettings.click()
    }
}

export default CookiesPopup