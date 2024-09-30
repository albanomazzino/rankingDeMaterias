package com.example.school.school;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
public class SchoolDataInitializer {

    @Autowired
    private SchoolService schoolService;

    @EventListener(ApplicationReadyEvent.class)
    public void populateData() {
        schoolService.populateDatabase();
    }
}

