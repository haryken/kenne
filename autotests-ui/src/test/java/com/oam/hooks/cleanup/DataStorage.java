package com.oam.hooks.cleanup;

import com.oam.apihelper.CollectionHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;


import java.util.ArrayList;
import java.util.List;

@Component
public class DataStorage {
    @Autowired
    private CollectionHelper collectionHelper;

    private List<String> collectionNames;

    public DataStorage() {
        this.collectionNames = new ArrayList<>();
    }

    private List<String> getCollectionNames() {
        return this.collectionNames;
    }

    public void setCollectionNames(String collection) {
        this.collectionNames.add(collection);
    }

    private void cleanUpCollection() {
        if (!getCollectionNames().isEmpty()) {
            for (String collectionName : getCollectionNames()) {
                boolean status = collectionHelper.deleteCollectionById(collectionHelper.getCollectionIdByName(collectionName));
                if (!status) {
                    System.out.println("!!!!!!!!!!!!!!!!!!!!!!!!!! DELETE COLLECTION " + collectionName + " IS FAILED");
                }
            }
        }
    }

    public void cleanUpAll() {
        cleanUpCollection();
    }
}