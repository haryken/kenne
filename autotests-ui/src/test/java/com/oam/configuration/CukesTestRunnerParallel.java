package com.oam.configuration;

import io.cucumber.testng.CucumberOptions;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import com.oam.utils.Props;


@CucumberOptions(
        features = {"src/test/resources/features"},
        glue = "com.oam.stepdefs",
        tags = "@regression",
        plugin = {
                "pretty",
                "json:target/json-cucumber-reports/cukejson.json",
                "junit:target/junit-reports/junit-results.xml",
                "testng:target/testng-cucumber-reports/cuketestng.xml",
                "rerun:target/failed_scenarios.txt"
        },
        dryRun = false,
        strict = true
)
public class CukesTestRunnerParallel extends AbstractTestNGCucumberParallelTests {

    @BeforeClass
    public static void before() {
        // Load Profile Path for Test/Stage/Production Environment.
        Props.loadRunConfigProps(EvnConfig.getEnvProfilePath());
        EvnConfig.setThreadCount("1");
        // Setup Before run any Cucumber Test
    }

    @AfterClass
    public static void after() {
        //Clean Up After run all Cucumber Tests
    }
}