package com.example.school;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
@Builder
public class FullSchoolResponse {
    private String name;
    private String address;
    private List<User> schoolUsers;
}
