package com.oam.stepdefs.admin;

import com.oam.pages.admin.CreateNewAssignmentPage;
import com.oam.stepdefs.AbstractStep;
import io.cucumber.datatable.DataTable;
import io.cucumber.java8.En;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Map;

public class CreateNewAssignmentSteps extends AbstractStep implements En {
    @Autowired
    private CreateNewAssignmentPage createNewAssignmentPage;
    public CreateNewAssignmentSteps() {
        And("^the user creates assignment$",(DataTable dataTable)->{
            Map<String,String> assignmentDetails = dataTable.asMaps().get(0);
            createNewAssignmentPage.inputAssignmentDetails(assignmentDetails.get("user"),assignmentDetails.get("asset"));

        });
    }
}
