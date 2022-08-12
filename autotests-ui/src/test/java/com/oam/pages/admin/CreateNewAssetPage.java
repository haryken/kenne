package com.oam.pages.admin;

import com.oam.pages.BasePage;
import com.oam.stepdefs.World;
import com.oam.utils.Context;
import com.oam.utils.ObjectMap;
import com.oam.utils.RandomUtils;
import net.bytebuddy.asm.Advice;
import org.openqa.selenium.By;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;



@Component
public class CreateNewAssetPage extends BasePage {
    @Autowired
    private World world;
    private ObjectMap objectmap = new ObjectMap("./src/test/java/com/oam/locators/admin/create_new_asset_page.properties");

    public void inputAssetDetails(String name, String specification, String state){
        By createNewAssetNameEle = objectmap.getLocator("createNewAsset.name");
        By createNewAssetSpecificationEle = objectmap.getLocator("createNewAsset.specification");
        By createNewAssetInstalledDateEle = objectmap.getLocator("createNewAsset.installedDate");
        By createNewAssetCurrentDateEle = objectmap.getLocator("createNewAsset.currentDate");
        By createNewAssetStateEle = objectmap.getLocatorAndFormats("createNewAsset.state",state);
        By createNewAssetSubmitBtnEle = objectmap.getLocator("createNewAsset.submitBtn");

        if(name.equalsIgnoreCase("random")){
            name = "Laptop" + RandomUtils.getRandomName();
        }
        world.scenarioContext.setContext(Context.ASSET_NAME,name);
        setValue(createNewAssetNameEle,name);
        setValue(createNewAssetSpecificationEle,specification);
        clickElement(createNewAssetStateEle);
        clickElement(createNewAssetInstalledDateEle);
        clickElement(createNewAssetCurrentDateEle);
        clickElement(createNewAssetSubmitBtnEle);
    }

    public String getAssetName(){
        By createNewAssetNameEle = objectmap.getLocator("createNewAsset.name");
        return getValue(createNewAssetNameEle);
    }

    public String getAssetSpecification(){
        By createNewAssetSpecificationEle = objectmap.getLocator("createNewAsset.specification");
        return getText(createNewAssetSpecificationEle);
    }

}
