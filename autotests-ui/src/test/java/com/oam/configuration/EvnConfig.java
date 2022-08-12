package com.oam.configuration;

public class EvnConfig {
    private static final String TEST_EVN = System.getProperty("testEvn", "stage");

    /**
     * Get Environment Profile path for executing test suite.
     */
    public static String getEnvProfilePath() {
        return "./src/test/resources/profiles/" + TEST_EVN + "/env_config.properties";
    }

    /**
     * Get Environment Profile
     */
    public static String getEnvProfile() { return TEST_EVN; }

    /**
     * Get Selenium Grid Hub URL.
     */
    private static final String GRID_HUB = System.getProperty("GRID_HUB", "");

    /**
     * Get Browser type to run the test
     */
    public static String getGridHub() {
        return GRID_HUB;
    }

    private static final String BROWSER = System.getProperty("browser", "edge");

    /**
     * Get Browser type to run the test
     */
    public static String getBrowser() {
        return BROWSER;
    }

    private static final String SCREENSHOT_ON_FAILURE = System.getProperty("SCREENSHOT_ON_FAILURE", "true");

    /**
     * Get environment variable of taking screenshot on failure.
     * Make sure that you clicked "Show Before/After Hooks" in the report in order to see the taken screenshot.
     */
    public static boolean getEnvScreenShotOnFailure() {
        return Boolean.parseBoolean(SCREENSHOT_ON_FAILURE);
    }

    private static final String THREAD_COUNT = System.getProperty("dataproviderthreadcount", "");

    public static void setThreadCount(String threadCount){
        System.setProperty("dataproviderthreadcount", threadCount);
    }

    private static final String USERNAME = System.getProperty("username", "");

    /**
     * Get Username type to run the test
     */
    public static String getUsername() {
        return USERNAME;
    }

    private static final String PASSWORD = System.getProperty("password", "");

    /**
     * Get Username type to run the test
     */
    public static String getPassword() {
        return PASSWORD;
    }
}
