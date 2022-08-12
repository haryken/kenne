package com.oam.hooks;

import com.oam.testdata.CommonData;
import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.Platform;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.edge.EdgeDriver;
import org.openqa.selenium.edge.EdgeOptions;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxOptions;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.remote.RemoteWebDriver;
import com.oam.configuration.EvnConfig;

import java.net.URL;
import java.util.HashMap;
import java.util.Map;

public class WebDriverFactory {

    private WebDriver webDriver;

    public WebDriverFactory() {
        this.webDriver = setWebDriver();
    }

    public WebDriver getDriver() {
        return this.webDriver;
    }

    private WebDriver setWebDriver() {
        String browser = EvnConfig.getBrowser();
        String gridHub = EvnConfig.getGridHub();
        if (gridHub.isEmpty()) {
            // Initialize a local WebDriver instance
            switch (browser) {
                case ("firefox"):
                    WebDriverManager.firefoxdriver().setup();
                    FirefoxOptions firefoxOptions = new FirefoxOptions();
                    firefoxOptions.setCapability("marionette", true);
                    webDriver = new FirefoxDriver(firefoxOptions);
                    break;
                case ("chromeHeadless"):
                    WebDriverManager.chromedriver().setup();
                    ChromeOptions chromeHeadless = new ChromeOptions();
                    chromeHeadless.setHeadless(true);
                    chromeHeadless.addArguments("--no-sandbox", "disable-dev-shm-usage", "--window-size=1920x1080");
                    webDriver = new ChromeDriver(chromeHeadless);
                    break;
                case ("edge"):
                    WebDriverManager.edgedriver().setup();
                    EdgeOptions edgeOptions = new EdgeOptions();
                    edgeOptions.setCapability("acceptInsecureCerts", true);
                    webDriver = new EdgeDriver(edgeOptions);
                    break;
                default:
                    WebDriverManager.chromedriver().setup();
                    ChromeOptions chrome = new ChromeOptions();
                    webDriver = new ChromeDriver(chrome);
                    break;
            }
        } else {
            // Use Selenium Grid to run tests. browser name must be specified.
            if (browser.isEmpty()) {
                System.out.println("*************** The browser's name should be specified ***************");
                System.exit(0);
            }
            else{
                // current Grid setup only support chrome and firefox.
                DesiredCapabilities capabilities;
                if ("firefox".equals(browser)) {
                    capabilities = DesiredCapabilities.firefox();
                    capabilities.setCapability("marionette", true);
                    capabilities.setBrowserName("firefox");
                } else {
                    capabilities = DesiredCapabilities.chrome();
                    capabilities.setBrowserName("chrome");
                }
                capabilities.setPlatform(Platform.LINUX);
                try {
                    webDriver = new RemoteWebDriver(new URL(gridHub), capabilities);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }
        return webDriver;
    }
}