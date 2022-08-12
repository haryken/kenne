package com.oam.pages;

import com.oam.utils.ObjectMap;
import org.openqa.selenium.*;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Quotes;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.oam.stepdefs.World;
import com.oam.testdata.CommonData;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

/**
 * Base class for page objects.
 */
@Component
public class BasePage {

    @Autowired
    private World world;
    private ObjectMap objectmap = new ObjectMap("./src/test/java/com/oam/locators/common_elements.properties");

    public void open(String url) {
        world.webDriverFactory.getDriver().get(url);
    }
    protected void clickElement(By locator) {
        clickElement(locator, CommonData.DEFAULT_TIMEOUT);
    }

    public void refresh(){
        world.webDriverFactory.getDriver().navigate().refresh();
    }

    public void clickPopUpLogoutBtn(){
        By popupLogOutBtnEle = objectmap.getLocator("popup.logoutBtn");
        clickElement(popupLogOutBtnEle);
    }
    protected void clickElement(By locator, long timeout) {
        clickElement(locator, false, timeout);
    }

    public void clickElement(By locator, boolean isScrolled, long timeout) {
        WebElement elm;
        if (isScrolled) {
            scrollIntoView(locator, true);
        }
        elm = waitElementToBeClickable(locator, timeout);
        elm.click();
    }

    protected String getText(WebElement elm) {
        return elm.getText();
    }

    protected String getText(By locator) {
        WebElement elm = waitElementToBeAppear(locator);
        return elm.getText();
    }


    /**
     * Get the "value" attribute of the element
     */
    protected String getValue(By locator) {
        WebElement elm = waitElementToBeExist(locator);
        return elm.getAttribute("value");
    }
    protected String getAttributeValue(By locator, String attributeName) {
        WebElement elm = waitElementToBeExist(locator);
        return elm.getAttribute(attributeName);
    }

    protected boolean isAttributeContainValue(By locator, String attributeName, String value){
        WebElement elm = waitElementToBeExist(locator);
        return elm.getAttribute(attributeName).contains(value);
    }

    protected void setValue(By locator, String value) {
        setValue(locator, value, CommonData.DEFAULT_TIMEOUT);
    }

    protected void setValue(By locator, String value, long timeout) {
        WebElement elm = waitElementToBeClickable(locator, timeout);
        elm.clear();
        elm.sendKeys(value);
    }

    protected void typeText(By locator, String value) {
        WebElement elm = waitElementToBeClickable(locator);
        elm.sendKeys(value);
    }

    protected void sendKeys(By locator, CharSequence... keysToSend) {
        WebElement elm = waitElementToBeExist(locator);
        elm.sendKeys(keysToSend);
    }

    protected void selectAndTypeText(By locator, String value) {
        WebElement elm = waitElementToBeClickable(locator);
        elm.sendKeys(Keys.chord(Keys.CONTROL, "a"));
        elm.sendKeys(value);
    }

    protected WebElement waitElementToBeClickable(By locator, long timeout) {
        WebDriverWait wait = new WebDriverWait(world.webDriverFactory.getDriver(), timeout);
        return wait.until(ExpectedConditions.elementToBeClickable(locator));
    }

    protected WebElement waitElementToBeClickable(By locator) {
        return waitElementToBeClickable(locator, CommonData.DEFAULT_TIMEOUT);
    }

    protected void waitElementToBeDisappear(By locator, long timeout) {
        WebDriverWait wait = new WebDriverWait(world.webDriverFactory.getDriver(), timeout);
        wait.until(ExpectedConditions.invisibilityOfElementLocated(locator));
    }

    protected void waitElementToBeDisappear(By locator) {
        waitElementToBeDisappear(locator, CommonData.DEFAULT_TIMEOUT);
    }

    protected WebElement waitElementToBeAppear(By locator, long timeout) {
        WebDriverWait wait = new WebDriverWait(world.webDriverFactory.getDriver(), timeout);
        return wait.until(ExpectedConditions.visibilityOfElementLocated(locator));
    }

    protected WebElement waitElementToBeAppear(By locator) {
        return waitElementToBeAppear(locator, CommonData.DEFAULT_TIMEOUT);
    }

    protected List<WebElement> waitElementsToBeAppear(By locator, long timeout) {
        WebDriverWait wait = new WebDriverWait(world.webDriverFactory.getDriver(), timeout);
        return wait.until(ExpectedConditions.visibilityOfAllElementsLocatedBy(locator));
    }

    protected List<WebElement> waitElementsToBeAppear(By locator) {
        WebDriverWait wait = new WebDriverWait(world.webDriverFactory.getDriver(), CommonData.DEFAULT_TIMEOUT);
        return wait.until(ExpectedConditions.visibilityOfAllElementsLocatedBy(locator));
    }

    protected List<WebElement> waitElementsToBeExist(By locator) {
        WebDriverWait wait = new WebDriverWait(world.webDriverFactory.getDriver(), CommonData.DEFAULT_TIMEOUT);
        return wait.until(ExpectedConditions.presenceOfAllElementsLocatedBy(locator));
    }

    protected WebElement waitElementToBeExist(By locator, long timeout) {
        WebDriverWait wait = new WebDriverWait(world.webDriverFactory.getDriver(), timeout);
        return wait.until(ExpectedConditions.presenceOfElementLocated(locator));
    }

    protected WebElement waitElementToBeExist(By locator) {
        return waitElementToBeExist(locator, CommonData.DEFAULT_TIMEOUT);
    }

    protected void waitElementToContainExpectedText(By locator, String text) {
        WebDriverWait wait = new WebDriverWait(world.webDriverFactory.getDriver(), CommonData.DEFAULT_TIMEOUT);
        wait.until(ExpectedConditions.textToBePresentInElementLocated(locator, text));
    }

    protected boolean isElementClickable(By locator) {
        WebDriverWait wait = new WebDriverWait(world.webDriverFactory.getDriver(), CommonData.CONDITION_TIMEOUT);
        try {
            wait.until(ExpectedConditions.elementToBeClickable(locator));
            return true;
        } catch (TimeoutException e) {
            return false;
        }
    }

    protected boolean isElementDisplayed(By locator, int timeOutInSeconds) {
        WebDriverWait wait = new WebDriverWait(world.webDriverFactory.getDriver(), timeOutInSeconds);
        try {
            wait.until(ExpectedConditions.visibilityOfElementLocated(locator));
            return true;
        } catch (TimeoutException e) {
            return false;
        }
    }

    protected boolean isElementDisplayed(By locator) {
        return isElementDisplayed(locator, CommonData.CONDITION_TIMEOUT);
    }

    protected boolean isElementDisappear(By locator) {
        WebDriverWait wait = new WebDriverWait(world.webDriverFactory.getDriver(), CommonData.CONDITION_TIMEOUT);
        try {
            wait.until(ExpectedConditions.invisibilityOfElementLocated(locator));
            return true;
        } catch (TimeoutException e) {
            return false;
        }
    }

    protected boolean isElementExisted(By locator) {
        WebDriverWait wait = new WebDriverWait(world.webDriverFactory.getDriver(), CommonData.CONDITION_TIMEOUT);
        try {
            wait.until(ExpectedConditions.presenceOfElementLocated(locator));
            return true;
        } catch (TimeoutException e) {
            return false;
        }
    }

    protected void scrollIntoView(By locator, boolean alignToTop) {
        WebElement elm = waitElementToBeExist(locator);
        JavascriptExecutor je = (JavascriptExecutor) world.webDriverFactory.getDriver();
        if (alignToTop) {
            je.executeScript("arguments[0].scrollIntoView(true);", elm);
        } else {
            je.executeScript("arguments[0].scrollIntoView(false);", elm);
        }
    }

    public void switchToNewWindow() {
        for (String winHandle : world.webDriverFactory.getDriver().getWindowHandles()) {
            switchToWindow(winHandle);
        }
    }

    public void switchToWindow(String nameOrHandle) {
        world.webDriverFactory.getDriver().switchTo().window(nameOrHandle);
    }

    public void waitForPageLoad(){
        waitElementToBeDisappear(By.xpath("//span[contains(@class, 'spinner-border')]"), CommonData.PAGE_LOAD_TIMEOUT);
        waitElementToBeDisappear(By.xpath("//*[contains(@class, 'spinner-border')]"), CommonData.PAGE_LOAD_TIMEOUT);

    }

    public void waitForAlertToAppear() {
        By alertEle = objectmap.getLocator("popup.Alert");
        waitElementsToBeAppear(alertEle);
    }

    public String getAlertText(){
        By alertEle = objectmap.getLocator("popup.Alert");
        return getText(alertEle);
    }

    public void waitForAlertToDisappear() {
        By alertEle = objectmap.getLocator("popup.Alert");
        waitElementsToBeAppear(alertEle);
    }

    public void clickAcceptBtn(){
        By popupEle = objectmap.getLocator("popup");
        By popupAcceptBtnEle = objectmap.getLocator("popup.AcceptBtn");
        waitElementToBeAppear(popupEle);
        clickElement(popupAcceptBtnEle);
    }
}
