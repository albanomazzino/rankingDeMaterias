package com.example.school;

import com.example.school.client.UserClient;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SchoolService {
    private final SchoolRepository schoolRepository;
    private final UserClient userClient;

    public void saveSchool(School school){
        schoolRepository.save(school);
    }

    public List<School> findAllSchools(){
        return schoolRepository.findAll();
    }

    public FullSchoolResponse findAllSchoolsWithUsers(Long schoolId) {
        var school = schoolRepository.findById(schoolId)
            .orElse(School.builder()
                .name("NOT_FOUND")
                .address("NOT_FOUND")
                .build());

        var users = userClient.findAllUsersBySchoolId(schoolId);

        return FullSchoolResponse.builder()
            .name(school.getName())
            .address(school.getAddress())
            .schoolUsers(users)
            .build();
    }
}
