package com.oam.pages.shared;

import com.oam.pages.BasePage;
import com.oam.utils.ObjectMap;
import org.openqa.selenium.By;
import org.springframework.stereotype.Component;

@Component
public class HomePage extends BasePage {
    private ObjectMap objectmap = new ObjectMap("./src/test/java/com/oam/locators/shared/home_page.properties");
    public void clickAssetBtn(String buttonName,String assetName) {
        By itemEle;
        switch (buttonName){
            case "accept":
                itemEle = objectmap.getLocatorAndFormats("assetBtn.accept",assetName);
                break;
            case "deny":
                itemEle = objectmap.getLocatorAndFormats("assetBtn.deny",assetName);
                break;
            default:
                itemEle = objectmap.getLocatorAndFormats("assetBtn.return",assetName);
        }
        clickElement(itemEle);
    }

    public void clickSortByAssetName() {
        By sortByAssetNameEle = objectmap.getLocator("sorting.assetName");
        clickElement(sortByAssetNameEle);
    }
}
