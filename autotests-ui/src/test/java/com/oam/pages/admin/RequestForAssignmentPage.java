package com.oam.pages.admin;

import com.oam.pages.BasePage;
import com.oam.utils.ObjectMap;
import org.openqa.selenium.By;
import org.springframework.stereotype.Component;

@Component
public class RequestForAssignmentPage extends BasePage {
    private ObjectMap objectmap = new ObjectMap("./src/test/java/com/oam/locators/admin/request_for_returning.properties");
    public boolean isStatusCompleted(String assetName) {
        By statusCompletedEle = objectmap.getLocatorAndFormats("asset.stateCompleted",assetName);
        return isElementDisplayed(statusCompletedEle);
    }

    public boolean isRequestVisible(String assetName) {
        By assetNameEle = objectmap.getLocatorAndFormats("asset.name",assetName);
        return isElementDisplayed(assetNameEle);
    }
}
