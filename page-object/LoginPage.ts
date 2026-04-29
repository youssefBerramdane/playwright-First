import { expect, Locator, Page } from "@playwright/test";

class LoginPage {

    private readonly page: Page
    private readonly emailField: Locator
    private readonly passwordField: Locator
    private readonly signInButton: Locator
    private readonly errorMessage: Locator

    constructor(page: Page){
        this.page = page
        this.emailField = this.page.getByRole('textbox', {name: 'Email address'})
        this.passwordField = this.page.getByRole('textbox', {name: 'Password'})
        this.signInButton = this.page.getByRole('button', {name: 'Sign In'})
        this.errorMessage = this.page.getByText('The username and/or password entered are not valid. Please check again.')
    }

    async login(email: string, password: string){
        await this.emailField.fill(email)
        await this.passwordField.fill(password)
        await this.signInButton.click()
    }

    async loginWithInvalidCredential(email: string, password: string){
        await this.login(email, password)
        await expect(this.errorMessage).toBeVisible()
    }

    async checkEmailFieldIsVisible(){
        await expect(this.emailField).toBeVisible()
    }

    async checkPasswordFieldIsVisible(){
        await expect(this.passwordField).toBeVisible()
    }

    async checkSignInButtonIsVisible(){
        await expect(this.signInButton).toBeVisible()
    }
}

export default LoginPage