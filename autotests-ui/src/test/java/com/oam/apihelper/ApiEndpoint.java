package com.oam.apihelper;

import com.oam.utils.Props;
import org.springframework.stereotype.Component;

@Component
public class ApiEndpoint {

    public static String GET_USER_COLLECTION = Props.getProp("apiBaseUrl") + "users/" +
            Props.getProp("userProfile") + "/collections";
    public static String DELETE_COLLECTION = Props.getProp("apiBaseUrl") + "collections/";
}
