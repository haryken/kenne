package com.oam.stepdefs.admin;
import com.oam.pages.admin.ManageAssetPage;
import com.oam.stepdefs.AbstractStep;
import com.oam.stepdefs.World;
import com.oam.utils.Context;
import io.cucumber.datatable.DataTable;
import io.cucumber.java8.En;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Map;
import static org.assertj.core.api.Assertions.assertThat;

public class ManageAssetSteps extends AbstractStep implements En {
    @Autowired
    private ManageAssetPage manageAssetPage;
    @Autowired
    private World world;

    public ManageAssetSteps() {
        And("^the user clicks Create New Asset button$",()->{
            manageAssetPage.clickCreateNewAssetBtn();
        });

        And("^the user clicks edit button$",()->{
            manageAssetPage.clickEditAssetBtn();
        });

        And("^the user should see the asset in the list$",(DataTable dataTable)->{
            Map<String, String> assetDetails = dataTable.asMaps().get(0);
            manageAssetPage.searchAsset(assetDetails.get("name"));
            String name ="";
            if (assetDetails.get("name").equalsIgnoreCase("random")){
                 name = (String) world.scenarioContext.getContext(Context.ASSET_NAME);
            }
            assertThat(manageAssetPage.getAssetDetailsInList("name")).isEqualTo(name);
            assertThat(manageAssetPage.getAssetDetailsInList("state")).isEqualTo(assetDetails.get("state"));
        });
    }
}
