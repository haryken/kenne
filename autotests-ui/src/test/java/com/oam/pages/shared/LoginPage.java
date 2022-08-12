package com.oam.pages.shared;

import com.oam.pages.BasePage;
import com.oam.utils.ObjectMap;
import gherkin.ast.DataTable;
import org.openqa.selenium.By;
import org.springframework.stereotype.Component;

@Component
public class LoginPage extends BasePage {
    private ObjectMap objectmap = new ObjectMap("./src/test/java/com/oam/locators/shared/login_page.properties");

        public void login(String username, String password){
            By usernameEle = objectmap.getLocator("loginPage.username");
            By passwordEle = objectmap.getLocator("loginPage.password");
            By loginBtnEle = objectmap.getLocator("loginPage.loginBtn");
            setValue(usernameEle,username);
            setValue(passwordEle,password);
            clickElement(loginBtnEle);
        }

}
