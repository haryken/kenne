package com.oam.stepdefs.shared;

import com.oam.pages.BasePage;
import com.oam.pages.shared.HomePage;
import com.oam.stepdefs.AbstractStep;
import com.oam.stepdefs.World;
import com.oam.utils.Context;
import io.cucumber.java8.En;
import org.springframework.beans.factory.annotation.Autowired;

public class HomeSteps extends AbstractStep implements En {
    @Autowired
    private HomePage homePage;
    @Autowired
    private World world;
    public HomeSteps(){
        Given("^the user clicks the \"(.*)\" button$", (String buttonName) -> {
            String assetName = (String) world.scenarioContext.getContext(Context.ASSET_NAME);
            homePage.clickAssetBtn(buttonName, assetName);
        });
        And("^the user clicks sort by asset name$", () -> {
            homePage.clickSortByAssetName();
        });
        And("^the user clicks \"(.*)\" button from the pop up to accept$", (String buttonType) -> {
            homePage.clickAcceptBtn();
        });
    }
}
