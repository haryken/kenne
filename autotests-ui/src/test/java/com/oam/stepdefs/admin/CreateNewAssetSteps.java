package com.oam.stepdefs.admin;
import com.oam.pages.admin.CreateNewAssetPage;
import com.oam.stepdefs.World;
import com.oam.utils.Context;
import io.cucumber.datatable.DataTable;
import com.oam.stepdefs.AbstractStep;
import io.cucumber.java8.En;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Map;
import static org.assertj.core.api.Assertions.assertThat;
public class CreateNewAssetSteps extends AbstractStep implements En {
    @Autowired
    private CreateNewAssetPage createNewAssetPage;
    @Autowired
    private World world;

    public CreateNewAssetSteps() {
        And("^the user creates a new asset$",(DataTable dataTable)->{
            Map<String, String> assetDetails = dataTable.asMaps().get(0);
            createNewAssetPage.inputAssetDetails(assetDetails.get("name"),assetDetails.get("specification"),assetDetails.get("state"));
        });

        And("^the user should see the asset detail$",(DataTable dataTable)->{
            Map<String, String> assetDetails = dataTable.asMaps().get(0);
            String name = null;
            if (assetDetails.get("name").equalsIgnoreCase("random")){
                name = (String) world.scenarioContext.getContext(Context.ASSET_NAME);
            }
            assertThat(createNewAssetPage.getAssetName()).isEqualTo(name);
            assertThat(createNewAssetPage.getAssetSpecification()).isEqualTo(assetDetails.get("specification"));
        });
    }
}
