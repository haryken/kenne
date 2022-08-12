package com.oam.stepdefs.shared;

import com.oam.configuration.EvnConfig;
import com.oam.pages.BasePage;
import com.oam.pages.shared.LoginPage;
import com.oam.stepdefs.AbstractStep;
import com.oam.stepdefs.World;
import com.oam.testdata.CommonData;
import com.oam.utils.Context;
import com.oam.utils.Props;
import io.cucumber.datatable.DataTable;
import io.cucumber.java8.En;
import org.checkerframework.checker.units.qual.A;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Map;
import static org.assertj.core.api.Assertions.assertThat;

public class LoginSteps extends AbstractStep implements En {
    @Autowired
    private LoginPage loginPage;
    @Autowired
    private BasePage basePage;


    public LoginSteps() {
        Given("^the user is on the login page$", () -> {
            loginPage.open("https://managementassetonlines.herokuapp.com/");
        });

        When("^the user logins with account$", (DataTable dataTable) -> {
            Map<String, String> userAccount = dataTable.asMaps().get(0);
            loginPage.login(userAccount.get("username"),userAccount.get("password"));
            basePage.waitForAlertToAppear();
        });

        Then("^the user should see the error message \"(.*)\"$", (String alertText) -> {
            basePage.waitForAlertToAppear();
            assertThat(basePage.getAlertText()).isEqualTo(alertText);

        });
    }

}