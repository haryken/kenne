package com.oam.apihelper;

import com.google.gson.*;
import okhttp3.FormBody;
import okhttp3.RequestBody;
import okhttp3.Response;
import okhttp3.ResponseBody;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Component
public class CollectionHelper extends BaseAPI {

    public JsonArray getCollectionList() {
        String url = ApiEndpoint.GET_USER_COLLECTION;
        Map<String, String> headers = new HashMap<>();

        try {
            ResponseBody responseBody = sendGetRequest(url, headers, true);
            Gson gson = new Gson();
            return gson.fromJson(responseBody.string(), JsonArray.class);
        } catch (IOException | JsonSyntaxException e) {
            e.printStackTrace();
        }
        return null;
    }

    public String getCollectionIdByName(String name) {
        for (JsonElement collection:getCollectionList()) {
            JsonObject collectionObject = collection.getAsJsonObject();
            if (collectionObject.get("title").getAsString().equals(name)) {
                return collectionObject.get("id").getAsString();
            }
        }
        return null;
    }

    public boolean deleteCollectionById(String collectionId) {
        String url = ApiEndpoint.DELETE_COLLECTION + collectionId;
        Map<String, String> headers = new HashMap<>();
        RequestBody formBody = new FormBody.Builder()
                .add("id", collectionId)
                .build();

        try {
            Response response = sendDeleteRequest(url, headers, formBody, true);
            if (response.code() == 204) {
                return true;
            }
        } catch (JsonSyntaxException e) {
            e.printStackTrace();
        }
        return false;
    }

}
