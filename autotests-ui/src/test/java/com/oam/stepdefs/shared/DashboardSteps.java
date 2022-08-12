package com.oam.stepdefs.shared;

import com.oam.pages.BasePage;
import com.oam.pages.shared.DashboardPage;
import com.oam.stepdefs.AbstractStep;
import io.cucumber.java8.En;
import org.springframework.beans.factory.annotation.Autowired;

import static org.assertj.core.api.Assertions.assertThat;

public class DashboardSteps extends AbstractStep implements En {
    @Autowired
    private DashboardPage dashboardPage;
    @Autowired
    private BasePage basePage;
    public DashboardSteps() {
        Then("^the user should see the \"(.*)\" page$",(String tabName)->{
            assertThat(dashboardPage.getCurrentTabName()).isEqualToIgnoringCase(tabName);
        });

        And("^the user logs out$",()->{
            dashboardPage.clickUserSettingDropDownList();
            dashboardPage.clickLogoutBtn();
            basePage.clickPopUpLogoutBtn();
        });

        And("^the user navigates to the \"(.*)\" page$",(String tabName)->{
            dashboardPage.clickDashboardTab(tabName);
        });
    }
}
