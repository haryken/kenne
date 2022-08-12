package com.oam.stepdefs;

import org.springframework.stereotype.Component;
import com.oam.hooks.WebDriverFactory;
import com.oam.utils.ScenarioContext;

@Component
public class World {
    public ScenarioContext scenarioContext;
    public WebDriverFactory webDriverFactory;

}
