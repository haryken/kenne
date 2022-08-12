package com.oam.utils;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

import static java.lang.System.out;

public class Props {
    private static Properties environmentProps;


    /**
     * Gets the key from Config.properties related to chosen profile
     */
    public static String getProp(String key) {
        if ((key == null) || key.isEmpty()) {
            return "";
        } else {
            return environmentProps.getProperty(key);
        }
    }

    public static void loadRunConfigProps(String envProfilePath) {
        environmentProps = new Properties();
        try {
            InputStream inputStream = new FileInputStream(new File(envProfilePath));
            environmentProps.load(inputStream);
//            properties.list(out);
        } catch (IOException e) {
            out.println("Exception stack trace:" + e);
        }
    }

}
