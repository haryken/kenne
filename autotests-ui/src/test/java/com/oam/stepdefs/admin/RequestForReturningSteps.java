package com.oam.stepdefs.admin;

import com.oam.pages.admin.RequestForAssignmentPage;
import com.oam.stepdefs.AbstractStep;
import com.oam.stepdefs.World;
import com.oam.utils.Context;
import io.cucumber.java8.En;
import org.springframework.beans.factory.annotation.Autowired;
import static org.assertj.core.api.Assertions.assertThat;
public class RequestForReturningSteps extends AbstractStep implements En {
    @Autowired
    private RequestForAssignmentPage requestForAssignmentPage;
    @Autowired
    private World world;
    public RequestForReturningSteps() {
        And("^the user should see request state as \"(.*)\"$", (String state) -> {
            String assetName = (String) world.scenarioContext.getContext(Context.ASSET_NAME);
            assertThat(requestForAssignmentPage.isStatusCompleted(assetName)).isTrue();
        });

        And("^the user should not see the request$", () -> {
            Thread.sleep(3000);
            String assetName = (String) world.scenarioContext.getContext(Context.ASSET_NAME);
            assertThat(requestForAssignmentPage.isRequestVisible(assetName)).isFalse();
        });

    }
}
