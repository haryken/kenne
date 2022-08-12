package com.oam.utils;

/*
Creating an object map for Element Locators
        a properties file named "client_pages.properties".
        Format :  [logical_name]=[locator_type]@@[locator_value]
        userName_field = id@@login_login_username
        onlineUser=cssSelector@@#sb-onlineusers > h3
*/

import org.openqa.selenium.By;
import org.springframework.stereotype.Component;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;

@Component
public class ObjectMap {
    //property file and provide the utils information to the test.

    Properties properties;

    public ObjectMap(String mapFile) {
        properties = new Properties();
        try {
            FileInputStream Master = new FileInputStream(mapFile);
            properties.load(Master);
            Master.close();
        } catch (IOException e) {
            System.out.println(e.getMessage());
        }
    }

    public By getLocator(String ElementName) {
        //Read value using the logical name as Key
        String locator = properties.getProperty(ElementName);
        //Split the value which contains utils type and utils value
        String locatorType = locator.split("@@")[0];
        String locatorValue = locator.split("@@")[1];
        //Return a instance of By class based on type of utils
        return DataHelper.convertToBy(locatorType, locatorValue);
    }

    public By getLocatorAndFormats(String ElementName, String... formatStrings) {
        String locator = properties.getProperty(ElementName);
        String locatorType = locator.split("@@")[0];
        String locatorValue = locator.split("@@")[1];
        String item = String.format(locatorValue, (Object[]) formatStrings);
        if (item.contains("\\")) {
            item = item.replaceAll("\\\\", "");
        }
        return DataHelper.convertToBy(locatorType, item);
    }
}
