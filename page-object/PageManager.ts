import { Page } from "@playwright/test";
import ProductDetailsPage from "./ProductDetailsPage";
import ProductListPage from "./ProductListPage";
import HomePage from "./HomePage";
import LoginPage from "./loginPage";

class PageManager {

    private readonly page: Page

    private readonly homePage: HomePage

    private readonly productDetailsPage: ProductDetailsPage

    private readonly productListPage: ProductListPage

    private readonly loginPage: LoginPage

    constructor(page: Page){
        this.page = page
        this.productDetailsPage = new ProductDetailsPage(this.page)
        this.productListPage = new ProductListPage(this.page)
        this.homePage = new HomePage(this.page)
        this.loginPage = new LoginPage(page)
    }

    userIsInProductDetailsPage(){
        return this.productDetailsPage
    }

    userInProductLisPage(){
        return this.productListPage
    }

    userIsInHomePage(){
        return this.homePage
    }

    userIsInLoginPage(){
        return this.loginPage
    }
}

export default PageManager