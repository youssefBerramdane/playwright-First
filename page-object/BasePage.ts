import { Page } from "@playwright/test";
import HeaderNavigationBar from "./components/HeaderNavigationBar";
import MiniCartDropDown from "./components/MiniCartDropDown";

class BasePage {

    readonly headerNavigationPage: HeaderNavigationBar
    readonly miniCartDropDown: MiniCartDropDown

    constructor(page: Page){
        this.headerNavigationPage = new HeaderNavigationBar(page)
        this.miniCartDropDown = new MiniCartDropDown(page)
    }
}

export default BasePage