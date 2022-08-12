package com.oam.pages.admin;

import com.oam.pages.BasePage;
import com.oam.stepdefs.World;
import com.oam.utils.Context;
import com.oam.utils.ObjectMap;
import org.openqa.selenium.By;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ManageAssignmentPage extends BasePage {
    @Autowired
    private World world;
    private ObjectMap objectMap = new ObjectMap("./src/test/java/com/oam/locators/admin/manage_assignment_page.properties");

    public void clickCreateNewAssignmentBtn(){
        By manageAssignmentCreateNewAssignmentBtnEle = objectMap.getLocator("manageAssignment.createNewAssignmentBtn");
        clickElement(manageAssignmentCreateNewAssignmentBtnEle);
    }

    public void searchAsset(String asset) {
        By manageAssignmentSearchEle = objectMap.getLocator("manageAssignment.search");
        By manageAssignmentSearchBtnEle = objectMap.getLocator("manageAssignment.searchBtn");
        if(asset.equalsIgnoreCase("random")){
            asset = (String) world.scenarioContext.getContext(Context.ASSET_NAME);
        }
        setValue(manageAssignmentSearchEle,asset);
        clickElement(manageAssignmentSearchBtnEle);
    }

    public String getAssignmentDetailsInList(String item){
        By ele;
        switch (item.toLowerCase()){
            case "user":
                ele = objectMap.getLocator("manageAssignment.firstUserName");
                break;
            case "asset":
                ele = objectMap.getLocator("manageAssignment.firstAssetName");
                break;
            default:
                ele = null;
                break;
        }
        return getText(ele);
    }
}
