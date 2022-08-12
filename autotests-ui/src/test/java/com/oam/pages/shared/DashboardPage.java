package com.oam.pages.shared;

import com.oam.pages.BasePage;
import com.oam.utils.ObjectMap;
import org.openqa.selenium.By;
import org.springframework.stereotype.Component;

@Component
public class DashboardPage extends BasePage {
    private ObjectMap objectmap = new ObjectMap("./src/test/java/com/oam/locators/shared/dashboard_page.properties");

    public String getCurrentTabName(){
        By currentTabNameEle = objectmap.getLocator("dashboard.currentTabName");
        return getText(currentTabNameEle);
    }

    public void clickUserSettingDropDownList() {
        By  dashboardUserSettingEle = objectmap.getLocator("dashboard.userSetting");
        clickElement(dashboardUserSettingEle);
    }

    public void clickLogoutBtn() {
        By  dashboardUserSettingLogOutBtnEle = objectmap.getLocator("dashboard.userSetting.logoutBtn");
        clickElement(dashboardUserSettingLogOutBtnEle);
    }

    public void clickDashboardTab(String tabName){
        By dashboardTabNameEle = objectmap.getLocatorAndFormats("dashboard.tabName",tabName);
        clickElement(dashboardTabNameEle);
    }
}
