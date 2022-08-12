package com.oam.stepdefs.admin;

import com.oam.pages.admin.ManageAssignmentPage;
import com.oam.stepdefs.AbstractStep;
import com.oam.stepdefs.World;
import com.oam.utils.Context;
import io.cucumber.datatable.DataTable;
import io.cucumber.java8.En;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Map;
import static org.assertj.core.api.Assertions.assertThat;

public class ManageAssignmentSteps extends AbstractStep implements En {
    @Autowired
    private ManageAssignmentPage manageAssignmentPage;
    @Autowired
    private World world;
    public ManageAssignmentSteps() {
        And("^the user clicks Create New Assignment button$",()->{
            manageAssignmentPage.clickCreateNewAssignmentBtn();
        });

        Then("^the user should see the assignment in the list$",(DataTable dataTable)->{
            Map<String,String> expectedDetails = dataTable.asMaps().get(0);
            manageAssignmentPage.searchAsset(expectedDetails.get("asset"));
            String  assetName = "";
            if(expectedDetails.get("asset").equalsIgnoreCase("random")){
                assetName = (String) world.scenarioContext.getContext(Context.ASSET_NAME);
            }
            assertThat(manageAssignmentPage.getAssignmentDetailsInList("asset")).isEqualTo(assetName);
            assertThat(manageAssignmentPage.getAssignmentDetailsInList("user")).isEqualTo(expectedDetails.get("user"));
        });
    }
}
