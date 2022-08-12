package com.oam.pages.admin;

import com.oam.pages.BasePage;
import com.oam.stepdefs.World;
import com.oam.utils.Context;
import com.oam.utils.ObjectMap;
import org.openqa.selenium.By;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CreateNewAssignmentPage extends BasePage {
    @Autowired
    private World world;
    private ObjectMap objectmap = new ObjectMap("./src/test/java/com/oam/locators/admin/create_new_assignment_page.properties");

    public void inputAssignmentDetails(String user,String asset){
        By createNewAssignmentUserEle = objectmap.getLocator("createNewAssignment.user");
        By createNewAssignmentAssetEle = objectmap.getLocator("createNewAssignment.asset");
        By createNewAssignmentSearchEle = objectmap.getLocator("createNewAssignment.search");
        By createNewAssignmentFirstUserSelectBtnEle = objectmap.getLocator("createNewAssignment.firstUserSelectBtn");
        By createNewAssignmentFirstAssetSelectBtnEle = objectmap.getLocator("createNewAssignment.firstAssetSelectBtn");
        By createNewAssignmentSearchBtnEle = objectmap.getLocator("createNewAssignment.searchBtn");
        By createNewAssignmentSelectBtnEle = objectmap.getLocator("createNewAssignment.selectBtn");
        By createNewAssignmentSaveBtnEle = objectmap.getLocator("createNewAssignment.saveBtn");

        clickElement(createNewAssignmentUserEle);
        setValue(createNewAssignmentSearchEle, user);
        clickElement(createNewAssignmentSearchBtnEle);
        clickElement(createNewAssignmentFirstUserSelectBtnEle);
        clickElement(createNewAssignmentSelectBtnEle);

        clickElement(createNewAssignmentAssetEle);
        if(asset.equalsIgnoreCase("random")){
            asset = (String) world.scenarioContext.getContext(Context.ASSET_NAME);
        }
        setValue(createNewAssignmentSearchEle, asset);
        clickElement(createNewAssignmentSearchBtnEle);
        clickElement(createNewAssignmentFirstAssetSelectBtnEle);
        clickElement(createNewAssignmentSelectBtnEle);
        clickElement(createNewAssignmentSaveBtnEle);
    }
}
