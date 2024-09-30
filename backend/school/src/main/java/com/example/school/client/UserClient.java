package com.example.school.client;

import com.example.school.school.User;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;

import java.util.List;

@FeignClient(name = "user-service", url = "${application.config.users-url}")
public interface UserClient {
    @GetMapping("/school/{school-id}")
    List<User> findAllUsersBySchoolId(@PathVariable("school-id") Long schoolId, @RequestHeader("Authorization") String token);
}
