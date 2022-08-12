package com.oam.pages.admin;

import com.oam.pages.BasePage;
import com.oam.stepdefs.World;
import com.oam.utils.Context;
import com.oam.utils.ObjectMap;
import org.openqa.selenium.By;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ManageAssetPage extends BasePage {
    @Autowired
    private World world;
    private ObjectMap objectmap = new ObjectMap("./src/test/java/com/oam/locators/admin/manage_asset_page.properties");

    public void clickCreateNewAssetBtn() {
        By createNewAssetBtnEle = objectmap.getLocator("manageAsset.createNewAssetBtn");
        clickElement(createNewAssetBtnEle);
    }

    public void clickEditAssetBtn() {
        By firstAssetEditBtnEle = objectmap.getLocator("manageAsset.firstAssetEditBtn");
        clickElement(firstAssetEditBtnEle);
    }
    public void searchAsset(String name){
        By manageAssetSearchEle = objectmap.getLocator("manageAsset.search");
        By manageAssetSearchBtnEle = objectmap.getLocator("manageAsset.searchBtn");
        if (name.equalsIgnoreCase("random")){
            name = (String) world.scenarioContext.getContext(Context.ASSET_NAME);
        }
        setValue(manageAssetSearchEle,name);
        clickElement(manageAssetSearchBtnEle);
    }
    public String getAssetDetailsInList(String item) {
        By ele;
        switch (item.toLowerCase()){
            case "name":
                ele = objectmap.getLocator("manageAsset.firstAssetName");
                break;
            case "state":
                ele = objectmap.getLocator("manageAsset.firstAssetState");
                break;
            default:
                ele = null;
                break;
        }
        return getText(ele);
    }

}
